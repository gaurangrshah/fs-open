const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { errorHandler } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  await blog.save();
  response.status(201).json(result);
});

module.exports = blogRouter;
