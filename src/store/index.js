import { createStore, combineReducers, applyMiddleware } from "redux";
import content from "../content";
import middleware from "./middleware";
import auth from "../auth";
const rootReducer = combineReducers({
  content: content.reducer,
  auth: auth.reducer,
});
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
