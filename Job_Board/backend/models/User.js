const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        required:true
    },
    education:[{
        school:String,
        degree:String,
        fieldOfStudy:String,
        startDate:Date,
        endDate:Date,
        description:String
    }],
    experience: [{
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
            ref:"Company"
        },
        profilePhoto:{
            type:String,
            default:""
        }
    }
}
,{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)