const router = require("express").Router()
const isAuthenticated = require("../middlewares/auth")
const isRecruiter = require("../middlewares/isRecruiter")
const {getApplicantById,updateStatus, filterApplicantByStatus} = require("../controllers/employeeController")

router.get("/:jobId",isAuthenticated,isRecruiter,getApplicantById )
router.put("/status/:id",isAuthenticated,updateStatus)
router.get("/:jobId",isAuthenticated,isRecruiter,filterApplicantByStatus)


module.exports = router