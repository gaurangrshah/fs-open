/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

import { initializeBlogs, create, like, remove } from "./reducers/blog-reducer";
// import { initializeAllUsers } from "./reducers/users-reducer";
import { setUser, logout, login } from "./reducers/auth-reducer";
import { setNotification } from "./reducers/notification-reducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blog);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
  };

  const handleLike = async (blog) => {
    blog.user = blog.user.id; // replace user details with user.id
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await blogService.update(blog.id, likedBlog);
      dispatch(
        initializeBlogs(blogs.map((b) => (b.id !== blog.id ? b : likedBlog)))
      );

      dispatch(
        setNotification(`Liked ${blog.title} by: ${blog.author}`, "success")
      );
    } catch (exception) {
      dispatch(setNotification("Invalid blog", "error"));
    }
  };

  const handleCreate = async ({ title, author, url }) => {
    if (!user) {
      dispatch(setNotification("You need to log in first", "error"));
      return;
    }
    if (!title || !url) {
      dispatch(setNotification("Please fill in all fields", "error"));
      return;
    }
    try {
      blogFormRef.current.toggleVisibility();
      dispatch(initializeBlogs(blogs.concat({ title, author, url })));
      dispatch(
        setNotification(`New blog: ${title} by: ${author} added`, "error")
      );
    } catch (exception) {
      dispatch(setNotification("Invalid blog", "error"));
    }
  };

  const handleDelete = async (id) => {
    if (!user) {
      dispatch(setNotification("You need to log in first", "error"));
      return;
    }

    try {
      dispatch(remove(blogs.filter((b) => b.id !== id)));
      dispatch(initializeBlogs(blogs.filter((b) => b.id !== id)));

      dispatch(setNotification(`Deleted blog: ${id}`, "success"));
    } catch (exception) {
      dispatch(setNotification("Invalid blog", "error"));
    }
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel='log in'>
        <LoginForm />
      </Togglable>
    );
  };

  return (
    <>
      <h2>blogs</h2>
      <Notification />
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
            /* .sort((a, b) => b.likes - a.likes) */
            .map((blog) => (
              <Blog key={blog.id} {...{ blog, handleLike, handleDelete }} />
            ))}
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm
              {...{
                user,
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
