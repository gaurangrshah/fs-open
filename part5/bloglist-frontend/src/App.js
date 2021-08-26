import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

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

  const handleLoginSuccess = async (user) => {
    blogService.setToken(user.token);
    setUser(user);
    handleSuccess(`${user.name} logged in`);
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleLike = async (blog) => {
    blog.user = blog.user.id; // replace user details with user.id
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await blogService.update(blog.id, likedBlog);
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : likedBlog)));
      setSuccessMessage(`Liked ${blog.title} by: ${blog.author}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreate = async ({ title, author, url }) => {
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
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(newBlog));
      setSuccessMessage(
        `New blog: ${newBlog.title} by: ${newBlog.author} added`
      );
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      console.error("🚀 | file: App.js | exception", exception);
      setErrorMessage("Invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      setErrorMessage("You need to log in first!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      setSuccessMessage(`Deleted blog: ${id}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Invalid blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel='log in'>
        <LoginForm {...{ handleError, handleSubmit: handleLoginSuccess }} />
      </Togglable>
    );
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
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} {...{ blog, handleLike, handleDelete }} />
            ))}
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm
              {...{
                user,
                setErrorMessage,
                setSuccessMessage,
                handleCreate,
              }}
            />
          </Togglable>
        </>
      )}
    </>
  );
};

export default App;
