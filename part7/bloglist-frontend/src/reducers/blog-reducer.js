import blogService from "../services/blogs";
import { setNotification } from "./notification-reducer";

const blogReducer = (state = [], action) => {
  console.table(state);
  console.table(action);
  switch (action.type) {
    case "INIT":
      console.log("running init", action.type, action.data);
      return action.data;
    case "CREATE_BLOG":
      return state.concat(action.data);
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setNotification("Blogs initialized", "success"));
      dispatch({
        type: "INIT",
        data: blogs,
      });
    } catch (exception) {
      dispatch(setNotification(exception.message, "error"));
    }
  };
};

export const create = (content) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    try {
      const newBlog = await blogService.create(content, user.token);
      dispatch(setNotification(`created new blog ${content.title}`, "success"));
      dispatch({
        type: "CREATE_BLOG",
        data: { ...newBlog, user },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot create blog ${content.title}`, "error"));
    }
  };
};

export const update = (id, content) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    if (user.id !== content.user.id) throw new Error("insufficient privileges");
    try {
      const updatedBlog = await blogService.update(id, content, user.token);
      dispatch(setNotification(`updated blog ${content.title}`, "success"));
      dispatch({
        type: "UPDATE_BLOG",
        data: { ...updatedBlog, user },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot update blog ${content.title}`, "error"));
    }
  };
};

export const like = (content) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    console.log("🚀 | file: blog-reducer.js | line 75 | user", user);
    if (user.id !== content.user.id) throw new Error("insufficient privileges");
    try {
      const updatedBlog = await blogService.update(
        content.id,
        { likes: content.likes + 1 },
        user.token
      );
      dispatch(setNotification(`add like to blog ${content.title}`, "success"));
      dispatch({
        type: "UPDATE_BLOG",
        data: { ...updatedBlog, user },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot set like on ${content.title}`, "error"));
    }
  };
};

export const remove = (content) => {
  return async (dispatch, getState) => {
    const user = getState().user;
    if (user.id !== content.user.id) throw new Error("insufficient privileges");
    try {
      await blogService.deleteBlog(content.id, content.user.token);
      dispatch(setNotification(`deleted blog ${content.id}`, "success"));
      dispatch({
        type: "DELETE_BLOG",
        data: { id: content.id },
      });
    } catch (exception) {
      dispatch(setNotification("cannot delete blog", "error"));

      console.error(exception);
    }
  };
};

export default blogReducer;
