const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);

let blogAtStart,
  rootUser,
  rootToken,
  fakeUser,
  fakeToken,
  headers,
  selectedEntry,
  selected;

jest.setTimeout(40000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogList);
  await User.deleteMany({});

  rootUser = await new User({
    username: "root",
    passwordHash: await helper.getHashedPw("sekured"),
  }).save();

  rootToken = jwt.sign(
    { username: rootUser.username, id: rootUser.id },
    process.env.SECRET
  );
  headers = {
    Authorization: `bearer ${rootToken}`,
  };

  fakeUser = await new User({
    username: "joe",
    passwordHash: await helper.getHashedPw("schmoe"),
  }).save();

  fakeToken = jwt.sign(
    { username: fakeUser.username, id: fakeUser.id },
    process.env.SECRET
  );

  const newBlog = {
    likes: 3,
    title: "there should be only one",
    author: "Some Guy",
    url: "https://example.com/",
  };

  selectedEntry = {
    ...newBlog,
    title: "selectedEntry for testing purposes",
    user: rootUser.id,
  };
  selectedEntry = await new Blog(selectedEntry).save();
  selected = selectedEntry.toJSON();

  blogAtStart = await helper.blogsInDb();
  expect(blogAtStart).toHaveLength(helper.initialBlogList.length + 1);
});

afterEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
});

describe("when there is initially some notes saved", () => {
  test("bloglist are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("bloglist contains the correct amount of posts", async () => {
    const response = await api.get("/api/blogs").expect(200);
    expect(response.body).toHaveLength(blogAtStart.length);
  });

  test("unique identifier is named 'id'", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new blog entry", () => {
  test("succeeds with a status of 201 if new entry is added", async () => {
    const newBlog = {
      likes: 3,
      title: "there should be only one",
      author: "Some Guy",
      url: "https://example.com/",
    };
    const response = await api
      .post("/api/blogs")
      .set(headers)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blog = await helper.blogsInDb();
    expect(blog).toHaveLength(blogAtStart.length + 1);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe("there should be only one");
  });

  test("likes default to 0", async () => {
    const newBlog = {
      title: "there should be only one",
      author: "Some Guy",
      url: "https://example.com/",
    };

    const response = await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `bearer ${rootToken}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("fails with 400 when unauthorized", async () => {
    const newBlog = {
      likes: 3,
      title: "there should be only one",
      author: "Some Guy",
      url: "https://example.com/",
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });

  test("fails with 400 if title is missing", async () => {
    let newBlog = {
      likes: 3,
      author: "Some Guy",
      url: "https://example.com/",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${rootToken}`)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("fails with 400 if url is missing", async () => {
    let newBlog = {
      title: "The url is missing from this objects",
      likes: 3,
      author: "Some Guy",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${rootToken}`)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("updating a blog entry", () => {
  test("fails with 400 when user is unauthorized", async () => {
    await api
      .put(`/api/blogs/${selected.id}`)
      .send({ ...selected, title: "testing an update failure" })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("succeeds with 200 if id is valid", async () => {
    const updatedLike = { ...selected, likes: selected.likes + 1 };
    expect(selected.likes).toBe(3);

    await api
      .put(`/api/blogs/${updatedLike.id}`)
      .set("Authorization", `bearer ${rootToken}`)
      .send(updatedLike)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(blogAtStart.length);
  });
});

describe("deleting a blog entry", () => {
  test("succeeds with 204 if user is authorized", async () => {
    await api
      .delete(`/api/blogs/${selected.id}`)
      .set("Authorization", `bearer ${rootToken}`)
      .expect(204);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(blogAtStart.length - 1);
  });

  test("should not delete when user is not owner", async () => {
    await api
      .delete(`/api/blogs/${selected.id}`)
      .set("Authorization", `bearer ${fakeToken}`)
      .expect(401);

    const blogAtEnd = await helper.blogsInDb();
    expect(blogAtEnd).toHaveLength(blogAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
