import { AnyAction } from "redux";
import { SWITCH_LANGUAGE } from "../../constants/ActionTypes";
import { LAYOUT_TYPE, LAYOUT_TYPE_FULL, NAV_STYLE, NAV_STYLE_FIXED, THEME_COLOR, THEME_TYPE, THEME_TYPE_SEMI_DARK, UPDATE_RTL_STATUS } from "../../constants/ThemeSetting";
import type { Reducer } from "redux";

type SettingsReducerState = {
  navStyle: string;
  layoutType: string;
  themeType: string;
  themeColor: string;
  isDirectionRTL: boolean;
  locale: {
    languageId: string;
    locale: string;
    name: string;
    icon: string;
  };
};

const initialSettings = {
  navStyle: NAV_STYLE_FIXED,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_SEMI_DARK,
  themeColor: "",
  isDirectionRTL: false,
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
};

const SettingsReducer: Reducer<SettingsReducerState, AnyAction> = (state = initialSettings, action) => {
  switch (action.type) {
    case THEME_TYPE:
      const themeType: string = action.themeType;
      return {
        ...state,
        themeType: themeType,
      };
    case THEME_COLOR:
      const themeColor: string = action.themeColor;
      return {
        ...state,
        themeColor: themeColor,
      };

    case UPDATE_RTL_STATUS:
      const isDirectionRTL: boolean = action.rtlStatus;
      return {
        ...state,
        isDirectionRTL: isDirectionRTL,
      };
    case NAV_STYLE:
      const navStyle: string = action.navStyle;
      return {
        ...state,
        navStyle: navStyle,
      };
    case LAYOUT_TYPE:
      const layoutType: string = action.layoutType;
      return {
        ...state,
        layoutType: layoutType,
      };
    case SWITCH_LANGUAGE:
      const locale: { languageId: string; locale: string; name: string; icon: string } = action.payload;
      return {
        ...state,
        locale: locale,
      };
    default:
      return state;
  }
};
export default SettingsReducer;
