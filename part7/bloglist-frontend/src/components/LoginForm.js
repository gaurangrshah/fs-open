import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import PropTypes from "prop-types";
// import loginService from "../services/login";
import { login } from "../reducers/auth-reducer";
import { setNotification } from "../reducers/notification-reducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const user = await loginService.login({
      //   username,
      //   password,
      // });

      // window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      // handleSubmit(user);
      dispatch(login({ username, password }));
      dispatch(setNotification(`${username} logged in`, "success"));

      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("wrong credentials", "error"));
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>
          log in
        </button>
      </form>
    </div>
  );
};

// LoginForm.propTypes = {
//   handleError: PropTypes.func.isRequired,
// };

export default LoginForm;
