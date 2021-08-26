const initialState = ["welcome to the app"];

const notificationReducer = (state = initialState, action) => {
  console.table(state);
  console.log("action", action);
  switch (action.type) {
    case "SET_NOTIFICATION":
      if (state.length) state.shift();
      return state.concat(action.data);
    case "REMOVE_NOTIFICATION":
      const newState = state.filter((_, index) => index !== 0);
      return newState;
    default:
      return state;
  }
};

export const setNotification = (data, duration = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data,
    });
    setTimeout(() => {
      console.log("removing notification");
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, 5000);
  };
};

export default notificationReducer;
