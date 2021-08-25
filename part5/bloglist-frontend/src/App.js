import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const onBlogCreate = async (event) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("You need to log in first!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    if (!title || !url) {
      setErrorMessage("Please fill in all fields");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }
    try {
      const newBlog = await blogService.create({
        title,
        author: author || user.name,
        url,
      });
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(
        `New blog: ${newBlog.title} by: ${newBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      setErrorMessage("Invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification
        type={successMessage ? "success" : "error"}
        message={errorMessage || successMessage}
      />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div style={{ display: "flex" }}>
            logged in as: {user.name}
            <span>
              <button onClick={handleLogout}>Logout</button>
            </span>{" "}
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <BlogForm
            {...{
              title,
              setTitle,
              author,
              setAuthor,
              url,
              setUrl,
              onSubmit: onBlogCreate,
            }}
          />
        </>
      )}
    </>
  );
};

export default App;
