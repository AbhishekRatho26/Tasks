const asyncHandler = require("express-async-handler");
const User = require("../models/User")
const isRecruiter = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.id)
  if (!user || user.role !== "recruiter") {
    return res.status(403).json({
      message: "Access denied: Recruiter role required",
      success: false
    });
  }
  next(); 
});

module.exports = isRecruiter;