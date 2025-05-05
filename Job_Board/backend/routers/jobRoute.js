
const { postJob, getAllJobs, getAdminJobs, getJobById } = require("../controllers/jobController")
const isAuthenticated = require("../middlewares/auth")

const router  = require("express").Router()


router.post("/post",isAuthenticated,postJob)
router.get("/get",getAllJobs)
router.get("/getadminjobs",isAuthenticated,getAdminJobs)
router.get("/jobs/:id",isAuthenticated,getJobById)

module.exports = router
