const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const Applications = require("../models/Applications")
const bcrypt = require("bcrypt")
const { use } = require("bcrypt/promises")
const jwt = require("jsonwebtoken")
const Company = require("../models/Company")

const register = asyncHandler(async (req,res)=>{
    const {email,password,role} = req.body
    if( !email || !password || !role){
        return res.status(400).json({
            message:"All fields are manadatory",
            success:false
        })
    }
    const user = await User.findOne({email})
    if(user){
            return res.status(400).json({
                message:"User already exists",
                success:false
            })
    }
    const hashedPassword = await bcrypt.hash(password,10)
    await User.create({
        email,
        password:hashedPassword,
        role
    })
    return res.status(201).json({
        message:"Successfully registered and Account created sucessfully",
        success:true
    })
})

const login = asyncHandler(async(req,res)=>{
    const {email,password,role} = req.body
    if(!email || !password || !role){
        return res.status(400).json({
            message:"All fields are manadatory",
            success:false
        })
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Incorrect email or password",
            success:false
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message:"Incorrect password",
            success:false
        })
    }
    if(role != user.role){
        return res.status(400).json({
            message:"Account doesnot exist with current role",
            success:false
        })
    }
    const tokenData = {
        userId: user._id
    }
    const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"})
        user = {
            _id:user._id,
            name:user.name,
            email:user.email,
            phoneNumber:user.phone,
            role:user.role,
            profile:user.profile
}
    return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSize:"strict"}).json({
        message:`Logged in successfully, Welcome ${user.name}` ,
        user:user,
        token:token,
        success:true

    })
})

const logout = asyncHandler(async (req,res)=>{
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message:"Logged out successfully",
        success:true
    })
})


const createProfile = asyncHandler(async (req, res) => {
    const { name, phone, bio, skills, education, experience } = req.body;
    const profilePicture = req.file ? req.file.buffer.toString("base64") : null;
  
    if (!name  || !phone || !bio || !skills || !education || !experience) {
      return res.status(400).json({
        message: "All fields are mandatory",
        success: false
      });
    }
  
    const skillsArray = skills.split(",").map(skill => skill.trim());
    const userId = req.id;
  
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false
      });
    }

  
    user.name = name;
    user.phone = phone;
    user.education = education;
    user.experience = experience;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;
  
    if (profilePicture) {
      user.profile.profilePhoto = profilePicture;
    }
  
    await user.save();
  
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      profile: user.profile,
      education:education,
      experience:experience
    };
  
    return res.status(200).json({
      message: "Profile created successfully",
      user: safeUser,
      success: true
    });
  });
  

  const updateProfile = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      bio,
      skills,
      experience, 
      education 
    } = req.body;
  
    const profilePicture = req.file ? req.file.buffer.toString("base64") : null;
  
    const userId = req.id;
  
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false
      });
    }
    
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",").map(s => s.trim());
  
    if (profilePicture) {
      user.profile.profilePhoto = profilePicture;
    }
  
   
    if (Array.isArray(experience)) {
      user.experience = experience; 
    }
  
    if (Array.isArray(education)) {
      user.education = education; 
    }
  
    await user.save();
  
  
    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone,
      role: user.role,
      profile: user.profile,
      experience: user.experience,
      education: user.education
    };
  
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true
    });
  });

const currentProfile = asyncHandler(async (req,res)=>{
    const userId = req.id
    const currentUser = await User.findById(userId)
    if(!currentUser){
      return res.status(400).json({
        success:false,
        message:"No Credentials"
      })
    }
    const userData = {
      name:currentUser.name,
      profilePhoto:currentUser.profile.profilePhoto,
      email:currentUser.email,
      role:currentUser.role
    }
    res.status(200).json({
      success:false,
      data:userData
    })
})

const getApplications = asyncHandler(async (req,res)=>{
  const userId = req.id
  const applications = await Applications.find({
    applicant:userId
  }).populate({
    path:"job",select:"title location company",
    populate:{
      path:"company",
      select:"name"
    }
  })
  return res.status(200).json({
    success:true,
    data:applications
  })

})

const getAllCompanies = asyncHandler(async (req,res)=>{
  const companies = await Company.find()
  return res.status(200).json({
    success:true,
    data:companies
  })
})

const getProfile = asyncHandler(async (req,res)=>{
  const userId = req.id
  const currentUser = await User.findById(userId)
  res.status(200).json(currentUser)

})

const getUserSkills = asyncHandler(async(req,res)=>{
  const userId = req.id
  const currentUser = await User.findById(userId)
  const skills = currentUser.skills
  return res.status(200).json({
    success:true,
    data:currentUser.profile.skills
  })
})
module.exports = {
    register,
    login,
    createProfile,
    updateProfile,
    logout,
    currentProfile,
    getApplications,
    getAllCompanies,
    getProfile,
    getUserSkills
}