import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import Settings from "./Settings";
import Common from "./Common";

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    common: Common,
  });

export default createRootReducer;
