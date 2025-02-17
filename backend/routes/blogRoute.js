const { bloggerAuth } = require("../middlewares/verifyTokens")
const { createBlog, getBlogs, getBlogById, editBlog, deleteBlog, topThree} = require("../services/blogService")

const router  = require("express").Router()


router.get("/getTopThree", topThree)
router.get("/getBlogs", getBlogs)
router.get("/getBlog/:id", getBlogById)
router.post("/postBlogs",bloggerAuth, createBlog)
router.put("/editBlog/:id",bloggerAuth, editBlog)
router.delete("/deleteBlog/:id",bloggerAuth, deleteBlog)

module.exports = router