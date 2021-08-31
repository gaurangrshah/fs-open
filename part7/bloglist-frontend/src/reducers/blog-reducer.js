import blogService from "../services/blogs";
import { setNotification } from "./notification-reducer";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE_BLOG":
      return state.concat(action.data);
    case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "LIKE_BLOG":
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
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);
      dispatch(setNotification(`created new blog ${newBlog.title}`, "success"));
      dispatch({
        type: "CREATE_BLOG",
        data: { ...newBlog },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot create blog ${content.title}`, "error"));
    }
  };
};

export const update = (id, content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, content);
      dispatch(setNotification(`updated blog ${content.title}`, "success"));
      dispatch({
        type: "UPDATE_BLOG",
        data: { ...updatedBlog },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot update blog ${content.title}`, "error"));
    }
  };
};

export const like = (content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.like(content.id, {
        likes: content.likes + 1,
      });
      dispatch(setNotification(`add like to blog ${content.title}`, "success"));
      dispatch({
        type: "LIKE_BLOG",
        data: { ...updatedBlog },
      });
    } catch (exception) {
      dispatch(setNotification(`cannot set like on ${content.title}`, "error"));
    }
  };
};

export const remove = (content) => {
  return async (dispatch) => {
    try {
      await blogService.remove(content.id);
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
