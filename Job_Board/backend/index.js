const express = require("express")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const db = require("./config/db")
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

const userRoute = require("./routers/userRoute")
const companyRoute = require("./routers/companyRoute")
const jobRoute = require("./routers/jobRoute")
const applicationRoute = require("./routers/applicationRoute")
const employeeRoute = require("./routers/employeeRoute")
const reccomdRoute = require("./routers/reccomendation")
const resumeRoute = require("./routers/resumeRoute")

app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
app.use("/api/v1/employee",employeeRoute)
app.use("/api",reccomdRoute)
app.use("/api",resumeRoute)


app.get("/home",(req,res)=>{
    res.status(200).json({
        message:"I am from backend",
        success:true
    })
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Running at port ${PORT}`)
})