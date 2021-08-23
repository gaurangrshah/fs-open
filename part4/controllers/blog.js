const blogRouter = require("express").Router();
const { findByIdAndDelete } = require("../models/blog");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const user = await User.findById(request.body.userId);
  const blog = new Blog({ ...request.body, user: user._id });
  const result = await blog.save();
  user.posts = user.posts.concat(blog._id);
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const res = await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
  });
  response.json(blog);
});

module.exports = blogRouter;
