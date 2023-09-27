import React from "react";
import { Layout, Input, Space, Typography } from "antd";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";

const { Header } = Layout;
const { Search } = Input;

const Topbar: React.FC = () => {
  const dispatch = useDispatch();
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);

  return (
    <Header>
      <div className="dt-header__top">
        {" "}
        {/* Add the topbar container */}
        <div className="dt-container">
          <form className="search-box d-none d-lg-block"> </form>
        </div>
      </div>

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
        <Typography.Title level={3} style={{ color: "#fff", margin: 0 }}>
          Your Website Name
        </Typography.Title>
        <div style={{ flex: 1 }}>
          <Space>
            <Search
              placeholder="Search..."
              onSearch={(value) => {
                // Handle search functionality here
                console.log("Search value:", value);
              }}
              style={{ width: 200 }}
              className="wieldy-search-bar"
            />
          </Space>
        </div>
        <div className="dt-nav-wrapper">
          <ul className="dt-nav d-lg-none">{/* Replace with your dropdown menu code */}</ul>
          <ul className="dt-nav">{/* Replace with your dropdown menu code */}</ul>
          <ul className="dt-nav">{/* Replace with your dropdown menu code */}</ul>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <div className="gx-d-none gx-d-lg-block" style={{ paddingTop: "14px" }}>
            <UserProfile />
          </div>
        </div>
        <div className="dt-header__bottom d-none d-lg-block">
          <div className="dt-container">
            <ul className="navbar-nav navbar-expand-md dt-navbar">
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0)">
                  Main
                </a>
                <ul className="sub-menu">{/* Replace with your submenu items */}</ul>
              </li>
              {/* Add more nav items and submenus here */}
            </ul>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
