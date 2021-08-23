const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  // const blogObjects = helper.initialBlogList.map((blog) => new Blog(blog));
  // const promiseArray = blogObjects.map((blog) => blog.save());
  // await Promise.all(promiseArray);
  await Blog.insertMany(helper.initialBlogList);
});

describe("when there is initially some notes saved", () => {
  test("bloglist are returned as json", async () => {
    await api
      .get("/api/blog")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("bloglist contains the correct amount of posts", async () => {
    const response = await api.get("/api/blog");
    expect(response.body).toHaveLength(helper.initialBlogList.length);
  });
  test("unique identifier is named 'id'", async () => {
    const response = await api.get("/api/blog");
    expect(response.body[0].id).toBeDefined();
  });

  test("likes defaul to 0", async () => {
    const newBlog = helper.initialBlogList[2];
    delete newBlog.likes;
    const response = await api.post("/api/blog").send(newBlog);

    expect(response.body.likes).toBe(0);
  });
});

describe("addition of a new blog entry", () => {
  test("succeds with a status of 201 if new entry is added", async () => {
    const newBlog = helper.initialBlogList[2];
    const response = await api
      .post("/api/blog")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blog = await helper.blogsInDb();
    expect(blog).toHaveLength(helper.initialBlogList.length + 1);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe("Canonical string reduction");
  });

  test("fails with 400 if title or url are missing", async () => {
    let newBlog = helper.initialBlogList[3];
    delete newBlog.title;
    await api.post("/api/blog").send(newBlog).expect(400);

    newBlog = helper.initialBlogList[4];
    delete newBlog.url;
    await api.post("/api/blog").send(newBlog).expect(400);
  });
});

describe("deleting a blog entry", () => {
  test("succeeds with 204 if id is valid", async () => {
    const blogAtStart = await helper.blogsInDb();
    const entryToDelete = blogAtStart[0];

    await api.delete(`/api/blog/${entryToDelete.id}`).expect(204);

    const blogAtEnd = await helper.blogsInDb();

    expect(blogAtEnd).toHaveLength(blogAtStart.length - 1);
  });
});
describe("updating a blog entry", () => {
  test.only("succeeds with 200 if id is valid", async () => {
    const blog = await helper.blogsInDb();
    const updatedLike = { ...blog[0], likes: blog[0].likes + 1 };

    await api.put(`/api/blog/${updatedLike.id}`).send(updatedLike).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
