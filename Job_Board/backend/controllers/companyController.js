const asyncHandler = require("express-async-handler")
const Company = require("../models/Company")

const registerCompany = asyncHandler(async (req,res)=>{
    const {name,location,description,website} = req.body
    if(!name){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        })
    }
    let company = await Company.findOne({name})
    if(company){
        return res.status(400).json({
            message:"Company already exists",
            success:false
        })
    }
    company = await Company.create({
        name:name,
        location:location.split(","),
        description:description,
        website:website,
        userId:req.id
    })
    return res.status(201).json({
        message:"Company registered Succesfully",
        company,
        success:true
    })
})

const getCompany = asyncHandler(async (req,res)=>{
    const userId = req.id
    const company = await Company.find({userId})
    if(!company){
        return res.status(404).json({
            message:"Company not Found",
            success:false
        })
    }
    return res.status(200).json({
        company,
        success:true
    })

})

const getCompanyById = asyncHandler(async (req,res)=>{
    const id = req.params.id
    const company = await Company.findById(id)
    if(!company){
        return res.status(404).json({
            message:"Company not Found",
            success:false
        })
    }
    return res.status(200).json({
        company,
        success:true
    })
})

const updateCompany = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, website, location } = req.body;
  
    let locationArray = [];
  
    // Check if location is a string and split it, otherwise assume it's an array
    if (typeof location === 'string') {
      locationArray = location.split(',');
    } else if (Array.isArray(location)) {
      locationArray = location;
    } else {
      return res.status(400).json({
        message: "Invalid location format",
        success: false
      });
    }
  
    const updateData = { name, description, website, location: locationArray };
  
    const company = await Company.findByIdAndUpdate(id, updateData);
    if (!company) {
      return res.status(404).json({
        message: "Company not Found",
        success: false
      });
    }
  
    return res.status(200).json({
      message: "Company updated successfully",
      company,
      success: true
    });
  });
  

module.exports = {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
}