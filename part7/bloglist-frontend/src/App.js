import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { initializeBlogs } from "./reducers/blog-reducer";
import { setUser, logout } from "./reducers/auth-reducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

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
      {!user ? (
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
              <Blog key={blog.id} {...{ blog, user }} />
            ))}
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm
              user={user}
              toggleVisibility={blogFormRef.current?.toggleVisibility}
            />
          </Togglable>
        </>
      )}
    </>
  );
};

export default App;
