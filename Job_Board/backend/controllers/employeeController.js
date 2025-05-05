const Application = require("../models/Applications")
const Job = require("../models/Job")
const Company = require("../models/Company")
const asyncHandler = require("express-async-handler")


const getApplicantById = asyncHandler(async (req, res) => {
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
    return res.status(200).json({
      message: "Applicants retrieved successfully",
      applicants: applications,
      success: true
    });
  })

const updateStatus = asyncHandler(async (req,res)=>{
    const {status} = req.body
    const applicationId = req.params.id
    if(!status){
        return res.status(400).json({
            message:"Please provide a status",
            success:false
        })
    }
    const application = await Application.findById(applicationId)
    if(!application){
        return res.status(404).json({
            message:"Application not found",
            success:false
        })
    }
    application.status = status.toLowerCase()
    await application.save()
    return res.status(200).json({
        message:"Status Updated Successfully",
        application,
        success:true
    })
})

const filterApplicantByStatus = asyncHandler(async (req,res)=>{
    const jobId = req.params.jobId
    const recruiterId = req.id
    const {status} = req.query

    const validateStatus = ["pending","accepted","rejected"]
    if(status && !validateStatus.includes(status)){
        return res.status(400).json({
            message:"Invalid status filter",
            success:false
        })
    }

    const job = await Job.findOne({_id:jobId,created_by:recruiterId})
    if (!job) {
        return res.status(404).json({
          message: "Job not found or access denied",
          success: false
        });
    }
    const query = { job: jobId };
    if (status) {
        query.status = status;
    }
    const applications = await Application.find(query)
    .populate("applicant", "-passwordHash")
    .sort({ createdAt: -1 });

    return res.status(200).json({
        message: `Applicants${status ? ` with status '${status}'` : ""} fetched successfully`,
        applicants: applications,
        success: true
    });
})


module.exports ={
    getApplicantById,
    updateStatus,
    filterApplicantByStatus
}