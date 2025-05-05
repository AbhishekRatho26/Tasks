const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:Array,
        of:String,
        default:[],
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum: ["full-time", "part-time", "contract","remote"],
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    application:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application"
    }]
},{
    timestamps:true
})


module.exports = mongoose.model("Job",jobSchema)