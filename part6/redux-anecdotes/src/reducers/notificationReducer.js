const initialState = ["welcome to the app"];

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const setNotification = (data, duration = 5000) => {
  if (window.timeout) {
    clearTimeout(window.timeout);
  }

  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data,
    });
    window.timeout = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, duration);
  };
};

export default notificationReducer;
