import { createStore } from "@reduxjs/toolkit";
import { combineReducers, applyMiddleware } from "redux";
import content from "../content";
const rootReducer = combineReducers({
  content: content.reducer,
});

const store = createStore(rootReducer);
// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => [
//     ...middleware,
//     ...getDefaultMiddleware(),
//   ],
// });
export default store;
