import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import URLSearchParams from "url-search-params";
import type { Location } from "history";
import AppLocale from "../../lngProvider";
import Wishlist from "./Wishlist";
import MainApp from "./MainApp";
import DonForm from "../DonForm/index";
import SignIn from "../SignIn";
import Afterpost from "../Afterpost/index";
import Regindex from "../Register/Regindex";
import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "../../appRedux/actions/Setting";
import { LAYOUT_TYPE_BOXED, LAYOUT_TYPE_FRAMED, LAYOUT_TYPE_FULL, NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, THEME_TYPE_DARK } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";

import Adminindex from "../AdminPage/Adminindex";
import PageNotFound from "../PageNotFound/PageNotFound";
import Gallery from "./Gallery";
import Cart from "./Cart";
import UpdatePassword from '../UpdatePassword';
import Myacc from "../Myacc";
import ProdDesc from "../ProdDesc";


type RestrictedRouteProps = {
  Component: React.FC<any>;
  location: Location;
};

const RestrictedRoute = ({ Component, location, ...rest }: RestrictedRouteProps) => {
  /* All routes will be checked through this component. (page refresh, navigation) */

  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const setLayoutType = (layoutType: string) => {
  if (layoutType === LAYOUT_TYPE_FULL) {
    document.body.classList.remove("boxed-layout");
    document.body.classList.remove("framed-layout");
    document.body.classList.add("full-layout");
  } else if (layoutType === LAYOUT_TYPE_BOXED) {
    document.body.classList.remove("full-layout");
    document.body.classList.remove("framed-layout");
    document.body.classList.add("boxed-layout");
  } else if (layoutType === LAYOUT_TYPE_FRAMED) {
    document.body.classList.remove("boxed-layout");
    document.body.classList.remove("full-layout");
    document.body.classList.add("framed-layout");
  }
};

const setNavStyle = (navStyle: string) => {
  if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL || navStyle === NAV_STYLE_DARK_HORIZONTAL || navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL || navStyle === NAV_STYLE_ABOVE_HEADER || navStyle === NAV_STYLE_BELOW_HEADER) {
    document.body.classList.add("full-scroll");
    document.body.classList.add("horizontal-layout");
  } else {
    document.body.classList.remove("full-scroll");
    document.body.classList.remove("horizontal-layout");
  }
};

let styleSheetLink = document.createElement("link");
styleSheetLink.type = "text/css";
styleSheetLink.rel = "stylesheet";
document.body.appendChild(styleSheetLink);

const App = () => {
  const dispatch = useDispatch();
  const { locale, navStyle, layoutType, themeColor, themeType, isDirectionRTL } = useSelector(({ settings }: RootState) => settings);
  const location = useLocation();

  useEffect(() => {
    if (isDirectionRTL) {
      document.documentElement.classList.add("rtl");
      document.documentElement.setAttribute("data-direction", "rtl");
    } else {
      document.documentElement.classList.remove("rtl");
      document.documentElement.setAttribute("data-direction", "ltr");
    }
    if (themeColor) {
      styleSheetLink.href = `/css/${themeColor}.min.css`;
    }
  }, [themeColor, isDirectionRTL]);

  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add("dark-theme");
      styleSheetLink.href = "/css/dark_theme.min.css";
    } else if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
      styleSheetLink.href = "";
    }
  }, [themeType]);

  useEffect(() => {
    if (locale) document.documentElement.lang = locale.locale;
  }, [locale]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has("theme")) {
      dispatch(setThemeType(params.get("theme")));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get("nav-style")));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get("layout-type")));
    }
  }, [location.search, dispatch, location.pathname]);

  useEffect(() => {
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [layoutType, navStyle]);

  // const currentAppLocale = AppLocale[locale.locale];
  const currentAppLocale = AppLocale["en"];

  return (
    <ConfigProvider locale={currentAppLocale.antd} direction={isDirectionRTL ? "rtl" : "ltr"}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/view-cart" component={Cart} />
          <Route exact path="/home" component={MainApp} />
          <Route exact path="/gallery" component={Gallery} />
          <Route path="/registration" component={Regindex} /> {/* Defining a route for registration */}
          <Route path="/donationForm" component={DonForm} /> {/* Defining a route for Donation form */}
          <Route path="/afterPost" component={Afterpost} /> {/* Defining a route for After post form */}
          <Route path="/productdescription" component={ProdDesc} />
          <Route exact path="/updatepassword" component={UpdatePassword} />
          <Route exact path="/myaccount" component={Myacc} />
          <Route path="/Adminpage" component={Adminindex}/>
          <Route path="/*" component={PageNotFound} />
          <RestrictedRoute location={location} Component={MainApp} />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default memo(App);
