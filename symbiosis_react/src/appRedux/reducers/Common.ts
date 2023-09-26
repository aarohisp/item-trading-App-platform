import { TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from "../../constants/ActionTypes";
import type { AnyAction, Reducer } from "redux";

type CommonReducerState = {
  navCollapsed: boolean;
  width: number;
  pathname: string;
};

const INIT_STATE = {
  navCollapsed: true,
  width: window.innerWidth,
  pathname: "/",
};

const CommonReducer: Reducer<CommonReducerState, AnyAction> = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE": {
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false,
      };
    }
    case WINDOW_WIDTH:
      const width: number = action.width;
      return {
        ...state,
        width: width,
      };
    case TOGGLE_COLLAPSED_NAV: {
      const navCollapsed: boolean = action.navCollapsed;
      return {
        ...state,
        navCollapsed: navCollapsed,
      };
    }
    default:
      return state;
  }
};

export default CommonReducer;
