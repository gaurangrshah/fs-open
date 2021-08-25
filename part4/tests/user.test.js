const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const api = supertest(app);
const config = require("../utils/config");

const initialUser = {
  username: "test",
  name: "Testuser",
  password: "sekured",
};

const shortPassword = "ww";

describe("user authentication", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(config.SECRET, 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const freshUser = {
      username: "steve",
      name: "steven",
      password: "sinceyouknow",
    };

    await api
      .post("/api/users")
      .send(freshUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(freshUser.username);
  });
});

describe("user authentication", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash(config.SECRET, 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("should not accept short password", async () => {
    const response = await api
      .post("/api/login")
      .send({ ...initialUser, password: shortPassword })
      .expect(400);

    expect(response.body.error).toBe("invalid password");
  });

  test("username should be valid length", async () => {
    const response = await api
      .post("/api/login")
      .send({ ...initialUser, username: "yo" })
      .expect(400);

    expect(response.body.error).toBe("invalid username");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
