import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Input } from "@chakra-ui/react";

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
          <Input
            id="username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" type="submit" variant="solid">
          log in
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
