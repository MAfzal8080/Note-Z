const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Blog = require("../models/Blog");
const { body, validationResult } = require("express-validator");

router.get("/fetchblog", fetchuser, async (req, res) => {
  try {
    const blog = await Blog.find({ user: req.user.id });
    res.json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

router.post(
  "/addblog",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const blog = new Blog({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveBlog = await blog.save();
      res.json(saveBlog);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newBlog = {};
    if (title) {
      newBlog.title = title;
    }
    if (description) {
      newBlog.description = description;
    }
    if (tag) {
      newBlog.tag = tag;
    }
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: newBlog },
      { new: true }
    );
    res.json({ blog });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Not found");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }
    blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ blog, "Success": "Blog no longer exists..."});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
