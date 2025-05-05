const { register, login, updateProfile, logout, createProfile, currentProfile, getApplications, getAllCompanies, getProfile, getUserSkills } = require("../controllers/userController")
const isAuthenticated = require("../middlewares/auth")
const upload = require("../middlewares/multerConfig")

const router  = require("express").Router()


router.post("/register",register)
router.post("/login",login)
router.post("/profile/create",isAuthenticated,createProfile)
router.post("/profile/update",isAuthenticated,upload.single("image"),updateProfile)
router.get("/profile/currentUser",isAuthenticated,getProfile)
router.get("/applications",isAuthenticated,getApplications)
router.get("/skills",isAuthenticated,getUserSkills)
router.get("/companies",getAllCompanies)
router.get("/profile",isAuthenticated,currentProfile)
router.get("/logout",isAuthenticated,logout)

module.exports = router
