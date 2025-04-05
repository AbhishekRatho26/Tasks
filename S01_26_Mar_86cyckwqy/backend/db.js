const mongoose = require("mongoose")

MONGO_URI= process.env.MONGO_URI
module.exports = mongoose.connect(MONGO_URI).then(()=>console.log("DB connected successfully")).catch(err=>console.log(err));