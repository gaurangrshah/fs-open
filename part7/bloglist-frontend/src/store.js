import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import usersReducer from "./reducers/users-reducer";
import authReducer from "./reducers/auth-reducer";
import blogReducer from "./reducers/blog-reducer";
import notificationReducer from "./reducers/notification-reducer";

const reducer = combineReducers({
  user: authReducer,
  users: usersReducer,
  blog: blogReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
