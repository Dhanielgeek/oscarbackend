const { ceoAuth } = require("../middlewares/verifyTokens")
const { createCeo, loginAdmin,registerAdmin,deleteAdmin,getAllAdmin, getAllCeo } = require("../services/adminService")

const router  = require("express").Router()

router.get("/getAdmin",ceoAuth, getAllAdmin)
router.post("/createCeo", createCeo)
router.get("/getAllCeos", getAllCeo)
router.post("/loginAdmin", loginAdmin)
router.post("/registerAdmin", ceoAuth,registerAdmin)
router.delete("/deleteAdmin/:id",  ceoAuth,deleteAdmin)

module.exports = router