const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user", {
    name: 1,
    username: 1,
    id: 1,
  });
  response.json(blog);
});

blogRouter.post("/", async (request, response) => {
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "must be authenticated" });
  }

  if (!request.body.title) {
    return response.status(400).json({ error: "title missing" });
  }
  if (!request.body.url) {
    return response.status(400).json({ error: "url missing" });
  }

  const blog = new Blog({ ...request.body, user: user._id });
  const savedBlog = await blog.save();
  user.posts = user.posts.concat(blog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "must be authenticated" });
  }

  const blog = await Blog.findById(request.params.id);

  if (request.user.id !== blog.user.toString()) {
    return response.status(401).json({ error: "only owners may make changes" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  if (!request.user) {
    return response.status(400).json({ error: "must be authenticated" });
  }

  if (request.user.id !== blog.user.toString()) {
    return response.status(400).json({ error: "only owners may make changes" });
  }

  blog = Object.assign(blog, request.body);
  const savedBlog = await blog.save();
  response.json(savedBlog.toJSON());
});

module.exports = blogRouter;
