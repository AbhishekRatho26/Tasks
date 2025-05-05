const {GoogleGenAI}=  require('@google/genai');
const router = require("express").Router()
const Job = require("../models/Job");
const Application = require("../models/Applications")
const isAuthenticated = require('../middlewares/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  vertexai: true,
  project: '957704210851',
  location: 'us-central1'
});
const model = 'projects/957704210851/locations/us-central1/endpoints/4036022412054102016';


// Set up generation config
const generationConfig = {
  maxOutputTokens: 8192,
  temperature: 1,
  topP: 0.95,
  responseModalities: ["TEXT"],
  speechConfig: {
    voiceConfig: {
      prebuiltVoiceConfig: {
        voiceName: "zephyr",
      },
    },
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'OFF',
    }
  ],
};


async function generateContent(query) {
    const req = {
      model: model,
      contents: [{ text: query }],
      config: generationConfig,
    };
  
    const streamingResp = await ai.models.generateContentStream(req);
    let fullText = "";
  
    for await (const chunk of streamingResp) {
      if (chunk.text) {
        fullText += chunk.text;
      }
    }
  
    return fullText;
  }
  

  router.post("/recommend", async (req, res) => {
    try {
      const { query } = req.body;
      
      // Step 1: Generate role from Gemini
      const response = await generateContent(query);
      const role = response.trim().toLowerCase(); // Example: "frontend engineer"
  
      // Step 2: Build regex to find similar job titles
      const roleRegex = new RegExp(role.split(" ")[0], "i"); // e.g., matches "Frontend" in title
  
      // Step 3: Find all matching jobs
      const recommendedJobs = await Job.find({
        title: { $regex: roleRegex }
      }).populate("company");
  
      return res.status(200).json({
        message: "Recommended jobs fetched successfully",
        response,
        jobs: recommendedJobs
      });
  
    } catch (err) {
      return res.status(500).json({
        message: "Error generating or fetching recommended jobs",
        error: err.message
      });
    }
  });
  
router.get("/candidate/:jobId", isAuthenticated, async (req, res) => {
    try {
      const jobId = req.params.jobId;
      const recruiterId = req.id;
  
      const job = await Job.findOne({ _id: jobId, created_by: recruiterId });
  
      if (!job) {
        return res.status(404).json({
          message: "Job not found or you're not authorized to access this job",
          success: false
        });
      }
  
      const applications = await Application.find({ job: jobId })
        .populate("applicant", "-passwordHash")
        .sort({ createdAt: -1 });
  
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      const enrichedApplicants = await Promise.all(
        applications.map(async (app) => {
          const applicantSkills = app.applicant.profile.skills || [];
          const jobSkills = job.requirements || [];
  
          const prompt = `
  Job Skills: ${jobSkills.join(", ")}
  Applicant Skills: ${applicantSkills.join(", ")}
  On a scale of 0 to 100, what percentage does the applicant match the job requirements? Only return a numeric percentage (e.g., 75).
  `;
  
          let fitPercentage = 0;
  
          try {
            const result = await model.generateContent([prompt]);
            const response = await result.response;
            const text = response.text();
            const percentage = parseInt(text.match(/\d+/)?.[0]) || 0;
            fitPercentage = Math.min(Math.max(percentage, 0), 100);
          } catch (err) {
            console.error("Gemini error:", err.message);
          }
  
          return {
            name: app.applicant.name,
            email: app.applicant.email,
            fitPercentage
          };
        })
      );
  
      return res.status(200).json({
        applicants: enrichedApplicants,
        success: true
      });
    } catch (error) {
      console.error("Error in recommend route:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
});
  

module.exports = router