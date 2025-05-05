const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controllers/applicationController")
const isAuthenticated = require("../middlewares/auth")

const router  = require("express").Router()


router.post("/apply/:id",isAuthenticated,applyJob)
router.get("/get",isAuthenticated,getAppliedJobs)
router.get("/:id/applicants",isAuthenticated,getApplicants)
// router.put("/status/:id",isAuthenticated,updateStatus)

module.exports = router
