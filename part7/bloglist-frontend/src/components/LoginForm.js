import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../reducers/auth-reducer";

import { setNotification } from "../reducers/notification-reducer";

const LoginForm = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(login({ username, password }));

      setUsername("");
      setPassword("");
      history.push("/blogs");
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

export default LoginForm;
