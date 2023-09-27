import UserProfile from "./UserProfile";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../appRedux/store/index";

const { Header } = Layout;

const Topbar = () => {
  const dispatch = useDispatch();
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);

  return (
    <Header>
      {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ? (
        <div className="gx-linebar gx-mr-3">
          <i
            className="gx-icon-btn icon icon-menu"
            onClick={() => {
              dispatch(toggleCollapsedSideNav(!navCollapsed));
            }}
          />
        </div>
      ) : null}
      <Link to="/">
        <div style={{ display: "flex" }}></div>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <div className="gx-d-none gx-d-lg-block" style={{ paddingTop: "14px" }}>
          <UserProfile />
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
