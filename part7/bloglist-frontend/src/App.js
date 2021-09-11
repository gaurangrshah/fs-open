import React, { useEffect, useRef } from "react";
import {
  Switch,
  Route,
  Link as ReactLink,
  useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { Avatar, Box, Button, Flex, Heading, Link } from "@chakra-ui/react";

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
      <Togglable buttonLabel="log in">
        <LoginForm />
      </Togglable>
    );
  };

  // const matchUser = useRouteMatch("/users/:id");
  // const currUser = matchUser
  //   ? users.find((user) => user.id === matchUser.params.id)
  //   : null;

  const matchBlog = useRouteMatch("/blogs/:id");
  const currBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  return (
    <>
      <ChakraProvider>
        <Box display="flex" p={4} align="center" width="ful">
          <Nav>
            {user ? (
              <Flex justify="flex-end" w="full">
                <Avatar name={user.name} mr={2} />
                <Button onClick={handleLogout}>Logout</Button>
              </Flex>
            ) : (
              loginForm()
            )}
          </Nav>
        </Box>
        <Notification />
        {!user ? null : (
          <>
            <Switch>
              <Route path="/users/:id">
                {users && <User user={user} />}
              </Route>
              <Route path="/blogs/:id">
                {blogs && <Blog user={user} blog={currBlog} />}
              </Route>
              <Route path="/blogs">
                <Box p={6}>
                  <Heading as="h2" mb={4} borderBottom="1px">
                    blogs
                  </Heading>
                  <Box mt={4}>
                    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                      <BlogForm
                        user={user}
                        toggleVisibility={blogFormRef.current?.toggleVisibility}
                      />
                    </Togglable>
                  </Box>
                  {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Box key={blog.id} my={6} p={4} border="1px" rounded={5}>
                        <Link as={ReactLink} to={`/blogs/${blog.id}`}>
                          {blog.title}
                        </Link>
                      </Box>
                    ))}
                </Box>
              </Route>
              <Route path="/users">
                <Users users={users} />
              </Route>
            </Switch>
          </>
        )}
      </ChakraProvider>
    </>
  );
};

export default App;
