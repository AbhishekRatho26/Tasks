const mongoose = require("mongoose")

const resumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    text:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Resume",resumeSchema)