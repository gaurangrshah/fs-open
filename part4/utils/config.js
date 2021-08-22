require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://gsdev:ukvHbr7aFNCljJ9s@cluster0.s2z5v.mongodb.net/blog?retryWrites=true";

module.exports = {
  MONGODB_URI,
  PORT,
};
