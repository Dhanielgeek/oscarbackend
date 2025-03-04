const jwt = require("jsonwebtoken")
const {OSCARNEWMAN_ADMIN_TOKEN} = require("../variables")

const checkToken=(req,res,next)=>{
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token=authHeader.split(" ")[1]

        jwt.verify(token, OSCARNEWMAN_ADMIN_TOKEN, (err,user)=>{
            if(err){
               return  res.status(400).json("invalid token")
            }
            req.user=user
          next()

        })
    }else {
        res.status(400).json("invalid or missing token")
    }
}   

const ceoAuth=(req, res, next)=>{
    checkToken(req, res,()=>{
      if (req.user.role==="ceo") {
          next()
      }
      else{
          res.status(403).json("you are not authorized, only the CEO")
      }
    })
  }

  const bloggerAuth=(req, res, next)=>{
    checkToken(req, res,()=>{
      if (req.user.role==='blogger') {
          next()
      }
      else{
          res.status(403).json("you are not authorized for this")
      }
    })
  }


  module.exports = {bloggerAuth, ceoAuth, checkToken}