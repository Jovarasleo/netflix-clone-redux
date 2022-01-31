import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import content from "../content";
import middleware from "./middleware";

const enhancers =
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const rootReducer = combineReducers({
  content: content.reducer,
});

const store = createStore(
  rootReducer,
  {},
  enhancers(applyMiddleware(...middleware))
);

export default store;
