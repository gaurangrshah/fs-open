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
    if (user) {
      dispatch({
        type: "LOGIN_USER",
        data: user,
      });

      localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setNotification(`${user.username} logged in`, "success"));
    } else throw new Error("login error");
  } catch (exception) {
    dispatch(setNotification("Wrong credentials", "error"));
    blogService.setToken("");
  }
};

export const setUserToken = (user) => async (dispatch) => {
  if (user.token) {
    blogService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      data: user,
    });
  }
  return;
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("loggedBlogappUser");
  blogService.setToken("");
  return dispatch({
    type: "LOGOUT_USER",
  });
};

export default authReducer;
