const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  if (!(body.password.length > 2)) {
    return response.status(400).json({ error: "invalid password" });
  }
  if (!(body.username.length > 2)) {
    return response.status(400).json({ error: "invalid username" });
  }

  const user = await User.findOne({ username: body.username });

  if (!user) return response.status(404).end();

  const isValidPassword =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

  if (!(user && isValidPassword)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const tokenUser = {
    username: user.username,
    id: user._id,
  };

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(tokenUser, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
