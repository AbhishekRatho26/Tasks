const asyncHandler = require("express-async-handler")
const Applications = require("../models/Applications")
const Job = require("../models/Job")


const applyJob = asyncHandler(async (req,res)=>{
    const userId = req.id 
    const jobId = req.params.id
    const {resume,coverletter} = req.body
    if(!resume || !coverletter){
        return res.status(400).json({
            success:false,
            message:"Please fill all the fields"
        })
    }
    if(!jobId){
        return res.status(400).json({
            message:"Job id is required",
            success:false
        })
    }
    const existingApplication = await Applications.findOne({job:jobId,applicant:userId})
    if(existingApplication){
        return res.status(400).json({
            message:"Application already exist",
            success:false
        })
    }
    const job = await Job.findById(jobId)
    if(!job){
        return res.status(404).json({
            message:"Job does not exist",
            success:false
        })
    }
    const newApplication = await Applications.create({
        resume:resume,
        coverletter:coverletter,
        job:jobId,
        applicant:userId,
    })
    job.application.push(newApplication._id)
    await job.save()
    return res.status(201).json({
        message:"Application submitted successfully",
        success:true

    })

})


const getAppliedJobs = asyncHandler(async (req,res)=>{
    const userId = req.id
    const applications = await Applications.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}},
        }
    })
    if(!applications){
        return res.status(404).json({
            message:"No applications found",
            success:false
        })
    }
    return res.status(200).json({
        applications,
        success:true
    })
})


const getApplicants = asyncHandler(async (req,res)=>{
    const jobId = req.params.id
    const job = await Job.findById(jobId).populate({
        path:"application",
        options:{createdAt:-1},
        populate:{
            path:"applicant"
        }
    })
    if(!job){
        return res.status(404).json({
            message:"Job not Found",
            success:false
        })
    }
    return res.status(200).json({
        job,
        success:true
    });
})


module.exports = {
    applyJob,
    getAppliedJobs,
    getApplicants,
}