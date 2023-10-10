import React from "react";
import { Layout, Input, Space, Typography, Button, Menu } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import UserProfile from "./UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCollapsedSideNav } from "../../appRedux/actions";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";
import { SearchOutlined } from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import SubMenu from "antd/lib/menu/SubMenu";
import { isAuthenticatedUser } from "../SignIn/Auth";

const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {
  const dispatch = useDispatch();
  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);
  const isAuthenticated = isAuthenticatedUser();

  return (
    <Header className="bg-dark py-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/home">
        <h1 className="text-white mb-0" style={{ fontSize: "30px", marginRight: "20px", marginTop: "10px" }}>
          HelpHive
        </h1>
      </Link>
      {/* Professional Search Bar */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          placeholder="Search..."
          size="large"
          prefix={<SearchOutlined style={{ marginRight: "10px" }} />}
          style={{
            width: "400px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            paddingLeft: "15px"
          }}
        />
      </div>
      {/* Category Dropdown */}
      <Menu mode="horizontal" selectable={false} style={{ marginLeft: "20px" }}>
        <SubMenu
          title={
            <span style={{ display: "flex", alignItems: "center" }}>
              <i className="icon icon-feedback" style={{ marginRight: "8px" }} />
              Category
            </span>
          }
        >
          <MenuItem key="clothes">Clothes</MenuItem>
          <MenuItem key="furniture">Furniture</MenuItem>
          <MenuItem key="school">School Essentials</MenuItem>
          <MenuItem key="stationery">Stationery</MenuItem>
          <MenuItem key="medicines">Medicines</MenuItem>
        </SubMenu>
      </Menu>

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
        {/* Add the link button here */}
        {/* Use an anchor tag to open the URL */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
          <div style={{ marginTop: "10px", display: "flex", gap: "10px"}}>
            {isAuthenticated ? (
              <>
                <Link to="/donationForm">
                  <Button type="primary">Donate on HelpHive</Button>
                </Link>
              </>
            ) : (
              <Link to="/">
                <Button type="primary">Sign In</Button>
              </Link>
            )}
          </div>

          {isAuthenticated && (
            <div className="gx-d-none gx-d-lg-block" style={{ paddingTop: "14px" }}>
              <UserProfile />
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
