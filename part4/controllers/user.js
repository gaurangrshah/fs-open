const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("posts", {
    // limit returned properties to only the ones we need:
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
    id: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  if (
    !request.body?.username?.length > 2 ||
    !request.body?.password?.length > 2
  ) {
    return response
      .status(400)
      .json({ error: "valid username and password required" });
  }

  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
