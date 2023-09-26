import { SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from "../../constants/ActionTypes";
import { LAYOUT_TYPE, NAV_STYLE, THEME_COLOR, THEME_TYPE, UPDATE_RTL_STATUS } from "../../constants/ThemeSetting";
import type { Dispatch } from "redux";

export function toggleCollapsedSideNav(navCollapsed: boolean) {
    return { type: TOGGLE_COLLAPSED_NAV, navCollapsed };
}

export function updateWindowWidth(width: number) {
    return (dispatch: Dispatch) => {
        dispatch({ type: WINDOW_WIDTH, width });
    };
}

export function setThemeType(themeType: string | null) {
    return (dispatch: Dispatch) => {
        dispatch({ type: THEME_TYPE, themeType });
    };
}

export function setThemeColor(themeColor: string) {
    return (dispatch: Dispatch) => {
        dispatch({ type: THEME_COLOR, themeColor });
    };
}

export function setDirectionRTL(rtlStatus: any) {
    return (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_RTL_STATUS, rtlStatus });
    };
}

export function onNavStyleChange(navStyle: string | null) {
    return (dispatch: Dispatch) => {
        dispatch({ type: NAV_STYLE, navStyle });
    };
}

export function onLayoutTypeChange(layoutType: string | null) {
    return (dispatch: Dispatch) => {
        dispatch({ type: LAYOUT_TYPE, layoutType });
    };
}

export function switchLanguage(locale: any) {
    return (dispatch: Dispatch) => {
        dispatch({
            type: SWITCH_LANGUAGE,
            payload: locale
        });
    };
}
