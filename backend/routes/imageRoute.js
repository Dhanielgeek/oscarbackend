const {uploadImage, upload}= require("../services/imageService")

const router  = require("express").Router()



router.post("/image-upload",upload.single("image"), uploadImage)

module.exports = router