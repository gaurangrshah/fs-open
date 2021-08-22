const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { errorHandler } = require("../utils/middleware");

blogRouter.get("/", (request, response) => {
  Blog.find({})
    .then((blog) => {
      response.json(blog);
    })
    .catch(errorHandler);
});

blogRouter.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch(errorHandler);
});

module.exports = blogRouter;
