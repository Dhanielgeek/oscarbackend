const {Admin} = require("../models")
const bcrypt = require("bcryptjs");
const {signJwt} = require("../utils/jwt");

const createCeo = async(req,res,next)=>{
    const { role, password, name, email} = req.body;
    const ceo = {role, password, name, email}
    if ( !name || !email || !password) {
      const err = new Error("provide all the required fields")
      err.status = 400
      return next(err)    
    }
     try {
    const userExist = await Admin.findOne({
        where: {
          email: email,
        },
      });
      if (userExist) {
        const err = new Error("email already in use")
        err.stats = 400
        return next(err)
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const saved = await Admin.create({ email: email, password: hashPassword, name, role:"ceo" });
      if (!saved) {
        const err = new Error("something went wrong")
        err.status = 400
        return next(err)
      }
      const data = saved.toJSON()
      delete data.password
      res.status(201).json(data)
  } catch (error) {
    const err = new Error(error.message)
    err.stats = 400
    return next(err)
  }
}



const registerAdmin = async(req,res,next)=>{
    const {email, password, name} = req.body
try {
    const bloggerExist = await Admin.findOne({where: {email}})
    if (bloggerExist) {
        const err = new Error("email already in use")
        err.stats = 400
        return next(err)  
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const createBlogger = await Admin.create({email,password:hashPassword,name,role: "blogger"})
    if (!createBlogger) {
        const err = new Error("something went wrong")
        err.stats = 400
        return next(err)  
    }
    const blogger = createBlogger.toJSON()
    delete blogger.password
    res.status(201).json(blogger)
} catch (error) {
    const err = new Error(error.message)
    err.status = 500
    return next(err) 
}
}

const loginAdmin = async(req,res,next)=>{
    const {email, password} = req.body
 try {
    
    const findBlogger = await Admin.findOne({where:{email}})
    if (!findBlogger) {
        const err = new Error("Incorrect email or password")
        err.status = 400
        return next(err) 
    }
   const isCorrect = await bcrypt.compare(password,findBlogger.password)

   if (!isCorrect) {
    const err = new Error("Incorrect email or password")
    err.status = 400
    return next(err)
   }
    const data ={email:findBlogger.email, role: findBlogger.role, name:findBlogger.name}
    const token = signJwt(data)
    const admin = findBlogger.toJSON()
    delete admin.password
    res.status(200).json({...admin, jwt:token})
}
    catch (error) {
    const err = new Error(error.message)
    err.status = 500
    return next(err)
 }
}

const getAllAdmin =async(req,res,next)=>{
  try {
    const allAdmin = await Admin.findAll({attributes:{exclude: ["password"]}})
    if (!allAdmin) {
      const err = new Error("Something went wrong")
      err.status = 400
      return next(err) 
    }
    res.status(200).json(allAdmin)
  } catch (error) {
     const err = new Error(error.message)
     err.stats = 400
     return next(err)
  }
}

const deleteAdmin =async(req,res,next)=>{
    const id = req.params.id
    try {
        const findAdmin = await Admin.findByPk(id)
        if (!findAdmin) {
            const err = new Error("Cannot find Admin")
            err.status = 400
            return next(err)   
        }
       await findAdmin.destroy() 
       res.status(200).json("Admin deleted")
    } catch (error) {
        const err = new Error(error.message)
        err.stats = 400
        return next(err)
    }

}
module.exports= {createCeo, deleteAdmin ,getAllAdmin, loginAdmin, registerAdmin}
