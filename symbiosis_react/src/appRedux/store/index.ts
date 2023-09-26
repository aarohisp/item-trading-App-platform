import { applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import createRootReducer from "../reducers";

const createBrowserHistory = require("history").createBrowserHistory;

export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];

const configureStore = (preloadedState?: any) => {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      )
    )
  );

  return store;
};

const store = configureStore(/* provide initial state if any */);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
