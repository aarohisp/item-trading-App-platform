import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import { Layout, Input, Space } from "antd"; // Import Input and Space from Ant Design
import UserProfile from "./UserProfile";
import type { RootState } from "../../appRedux/store/index";

const { Header } = Layout;
const { Search } = Input; // Destructure Search component from Ant Design

const Topbar = () => {
  const dispatch = useDispatch();
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);

  return (
    <Header>
      <div className="gx-flex-row gx-align-items-center" style={{ width: "100%" }}>
        <div className="gx-linebar gx-mr-3">
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ? (
            <i
              className="gx-icon-btn icon icon-menu"
              onClick={() => {
                dispatch(toggleCollapsedSideNav(!navCollapsed));
              }}
            />
          ) : null}
        </div>

        {/* Search Bar */}
        <div style={{ flex: 1 }}>
          <Space>
            <Search
              placeholder="Search..."
              onSearch={(value) => {
                // Handle search functionality here
                console.log("Search value:", value);
              }}
              style={{ width: 200 }}
            />
          </Space>
        </div>

        {/* User Profile */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <div className="gx-d-none gx-d-lg-block" style={{ paddingTop: "14px" }}>
            <UserProfile />
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
