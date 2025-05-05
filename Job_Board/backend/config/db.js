const mongoose = require("mongoose")

const URI = process.env.MONGO_URI

module.exports = mongoose.connect(URI) .then(()=>console.log("Connected to mongodb"))
                            .catch((err)=>console.log(err))