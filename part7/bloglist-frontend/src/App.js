import React, { useEffect, useRef } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import User from "./components/User";
import Nav from "./components/Nav";

import { initializeBlogs } from "./reducers/blog-reducer";
import { setUserToken, logout } from "./reducers/auth-reducer";
import { initializeUsers } from "./reducers/users-reducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blog);
  console.log("🚀 | file: App.js | line 22 | blogs", blogs);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("🚀 | file: App.js | line 38 | user", user);
      dispatch(setUserToken(user));
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

  const matchUser = useRouteMatch("/users/:id");
  const currUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const matchBlog = useRouteMatch("/blogs/:id");
  const currBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <>
      <Nav>
        {user ? (
          <div style={{ display: "flex" }}>
            logged in as: {user.name}
            <span>
              <button onClick={handleLogout}>Logout</button>
            </span>
          </div>
        ) : (
          loginForm()
        )}
      </Nav>
      <Notification />
      {!user ? null : (
        <>
          <Switch>
            <Route path='/users/:id'>{users && <User user={currUser} />}</Route>
            <Route path='/blogs/:id'>
              {blogs && <Blog user={currUser} blog={currBlog} />}
            </Route>
            <Route path='/blogs'>
              <h2>blogs</h2>
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>
                ))}
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm
                  user={user}
                  toggleVisibility={blogFormRef.current?.toggleVisibility}
                />
              </Togglable>
            </Route>
            <Route path='/users'>
              <Users users={users} />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
