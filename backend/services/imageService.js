const cloudinary = require("../config/serverConfig")
const multer = require("multer")

const uploadImage = async (req, res, next) => {
    try {
      const image = req.file;
      if (!image) {
       return res.json("empty");
      }
        const result = await cloudinary.uploader.upload(image.path,{recource_type:"image"});
      
      res.status(201).json({status: "success",message:"image uploaded successfully", mediaUrl: result.url});
    } catch (error) {
        const err = new Error(error.message)
        err.status = error.status
        return next(err)
     }
  };


  //IMAGE UPLOAD CONTROLLER
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  

  module.exports = {uploadImage, upload}