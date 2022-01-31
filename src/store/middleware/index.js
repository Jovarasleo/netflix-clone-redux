import logger from "./logger";
import thunk from "redux-thunk";

const allMiddlewares = [logger, thunk];

export default allMiddlewares;
