const asyncHandler = require("express-async-handler")
const Job = require("../models/Job")
const Company = require("../models/Company")

//admin 
const postJob = asyncHandler(async (req,res)=>{
    const {title,description,requirements,salary,experience,location,jobType,position,company} = req.body
    const userId = req.id 
    if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !company){
        return res.status(400).json({
            message:"Something is missing",
            sucess:false
        })
    }
    const companyDetails = await Company.findById(company)
    if (companyDetails.length === 0) {
        return res.status(404).json({
            message: "Company not found",
            success: false,
        })
    }
    const companyLocations = companyDetails.location
    if (!companyLocations.includes(location)) {
        return res.status(400).json({
            message: "Location not valid for the specified company",
            success: false,
        })
    }
    const requirementsArray = requirements.split(",")
    const job = await Job.create({
        title,
        description,
        requirements:requirementsArray,
        salary,
        experience,
        location,
        jobType,
        position,
        company:company,
        created_by:userId
    })
    return res.status(201).json({
        message:"Job posted successfully",
        job,
        success:true
    })
})


const getAdminJobs = asyncHandler(async (req,res)=>{
    const adminId = req.id 
    const jobs = await Job.find({created_by:adminId})
    if(!jobs){
        return res.status(404).json({
            message:"No job Found",
            success:false
        })
    }
    return res.status(200).json({
        jobs,
        success:true
    })
})


//students
const getAllJobs =asyncHandler(async (req,res)=>{
    const keyword = req.query.keyword || ""
    const query = {
        $or:[
            {title:{$regex:keyword,$options:"i"} },
            {description:{$regex:keyword,$options:"i"} },
        ]
    }
    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1})
    if(!jobs){
        return res.status(404).json
    }
    return res.status(200).json({
        jobs,
        success:true
    })
})

const getJobById = asyncHandler(async (req,res)=>{
    const jobId = req.params.id 
    const job = await Job.findById(jobId).populate({
        path: "company",
        select: "name location"
    })
    if(!job){
        return res.status(200).json({
            message:"Jobs not found",
            success:false
        })
    }
    return res.status(200).json({job,success:true})
})



module.exports = {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
}