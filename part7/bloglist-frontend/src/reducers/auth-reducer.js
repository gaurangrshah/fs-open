import loginService from "../services/login";
import blogService from "../services/blogs";
import { setNotification } from "./notification-reducer";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.data;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    let user = await loginService.login(credentials);
    localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user.token);
    return dispatch({
      type: "LOGIN_USER",
      data: user,
    });
  } catch (error) {
    setNotification("Wrong credentials", "error");
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("user");
  return dispatch({
    type: "LOGOUT_USER",
  });
};

export const setUser = (user) => async (dispatch) =>
  dispatch({
    type: "LOGIN_USER",
    data: user,
  });

export default authReducer;
