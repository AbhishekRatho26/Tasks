const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs/promises");
const { GoogleGenAI } = require("@google/genai");
const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth");
const Resume = require("../models/Resume");

const upload = multer({ dest: "uploads/" });


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
router.post("/upload", upload.single("resume"), isAuthenticated,async (req, res) => {
    try {
        const userId = req.id
      const fileBuffer = await fs.readFile(req.file.path);
      const parsed = await pdfParse(fileBuffer);
      resumeText = parsed.text;
      const resume = await Resume.create({
        userId:userId,
        text:resumeText
      })

      await fs.unlink(req.file.path); // delete file after use
      res.json({text:resumeText, message: "Resume uploaded and processed successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to process resume." });
    }
  });
  
  // Ask question route
router.post("/ask", isAuthenticated,async (req, res) => {
    const { question } = req.body;
    const userId = req.id
    const resume = await Resume.findOne({ userId });
    if (!resume.text) return res.status(400).json({ error: "Resume not uploaded." });
  
    try {
      const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `Here is my resume:\n\n${resume.text}\n\nQuestion: ${question}, try avodiing points, introductions,summaries and all,give point to point and straigh forward answers`,
        });
     
      res.json({ answer: response.text});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error generating answer." });
    }
  });

module.exports = router