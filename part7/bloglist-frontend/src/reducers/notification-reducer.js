const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.data;
    case "HIDE_NOTIFICATION":
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification, type, duration = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW_NOTIFICATION",
      data: {
        message: notification,
        type,
      },
    });

    setTimeout(() => {
      dispatch({
        type: "HIDE_NOTIFICATION",
        data: null,
      });
    }, duration);
  };
};

export default notificationReducer;
