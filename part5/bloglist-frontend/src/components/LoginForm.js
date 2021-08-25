import React, { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";

const LoginForm = ({ handleSubmit, handleError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });


      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      handleSubmit(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      handleError("wrong credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

export default LoginForm;
