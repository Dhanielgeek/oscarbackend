//create blog post
const {Posts} = require("../models")

const createBlog = async (req, res,next)=>{
    const { title, content, category, author, img } = req.body;
    const blog = {title, content, category, author, img}
    if (!title || !content || !category || !author || !img) {
      const err = new Error("provide all the required fields")
      err.status = 400
      return next(err)    
    }
    try {
      const createBlog = await Posts.create({ title, content, category, author, img });
      if (createBlog) {
         res.status(201).json(blog);
      }
    } catch (error) {
        const err = new Error(error.message)
        err.status = error.status
        return next(err)
}
}

const getBlogs =async (req,res,next)=>{
  try {
    const allPosts = await Posts.findAll({
      order: [["createdAt", "DESC"]],
    })
    if (allPosts.length===0) {
        const err = new Error("No blogs created yet")
        err.status = 400
        return next(err)
    }
    res.status(200).json(allPosts);
  } catch (error) {
     const err = new Error(error.message)
     err.status = error.status
     return next(err)
  }
}

const getBlogById =async (req,res,next)=>{
    const id = req.params.id;
  try {
    const singleBlog = await Posts.findByPk(id)
    if (!singleBlog) {
        const err = new Error("Blog post not found")
        err.status = 400
        return next(err)
    }

    res.status(200).json(singleBlog);
  } catch (error) {
     const err = new Error(error.message)
     err.status = error.status
     return next(err)  }
}

const deleteBlog =async (req,res,next) =>{
     const id = req.params.id
  try {
    const singleBlog = await Posts.findByPk(id)
    await singleBlog.destroy()
    return res.status(200).json("Blog deleted")
  } catch (error) {
    const err = new Error(error.message)
     err.status = error.status
     return next(err)  }
  }


  const editBlog = async(req,res,next) =>{
    const id = req.params.id;
    const updates = req.body;
    try {
      if (Object.keys(updates).length===0) {
        const err = new Error("Fill in at least one feild")
        err.status= 400
        return  next(err)
      }
      const singleBlog = await Posts.findByPk(id);
      const updated = await singleBlog.update(updates)

      res.status(201).json(updated);
    } catch (error) {
      const err = new Error(error.message)
      err.status = error.status
      return next(err)
    }
  }


  const  topThree= async(req,res,next)=>{
    try {
      const allPosts = await Posts.findAll({
        order: [["createdAt", "DESC"]],
        limit: 3,
      })
      if (allPosts.length===0) {
          const err = new Error("No blogs created yet")
          err.status = 400
          return next(err)
      }
      res.status(200).json(allPosts);
    } catch (error) {
      const err = new Error(error.message)
      err.status = error.status
      return next(err)
    }
  }
module.exports = {createBlog, getBlogs, getBlogById, deleteBlog,editBlog, topThree}