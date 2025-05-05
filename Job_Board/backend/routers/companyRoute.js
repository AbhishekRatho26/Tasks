const { registerCompany, getCompany, updateCompany, getCompanyById } = require("../controllers/companyController")

const isAuthenticated = require("../middlewares/auth")

const router  = require("express").Router()


router.post("/register",isAuthenticated,registerCompany)
router.get("/get",isAuthenticated,getCompany)
router.get("/get/:id",isAuthenticated,getCompanyById)
router.put("/update/:id",isAuthenticated,updateCompany)

module.exports = router
