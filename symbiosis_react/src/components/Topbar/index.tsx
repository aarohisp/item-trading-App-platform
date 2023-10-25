import React from "react";
import { useEffect, useState } from "react";
import { Layout, Input, AutoComplete, Space, Typography, Button, Menu } from "antd";
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
import axios from "axios";
import CONFIG from "../Config/config";
import { useHistory } from "react-router-dom";

import { isAuthenticatedUser } from "../SignIn/Auth";


const { Header } = Layout;
const { Search } = Input;

const Topbar = () => {
  const [searchText, setSearchText] = useState(''); // State to hold the search input value
  const [options, setOptions] = useState([]); // State to hold the search results
  const history = useHistory();

  // Function to handle search input change
  const handleSearch = (value: any) => {
    setSearchText(value);

    // Make an API request to search for items based on the input value
    axios
      .get(`${CONFIG.API_ENDPOINT}/api/search_items?query=${value}`)
      .then((response) => {
        const items = response.data.items.map((item: any) => ({
          value: item.item_name, // Display name in the dropdown
          data: item, // Actual data associated with the item
        }));
        setOptions(items);
      })
      .catch((error) => {
        console.error('Error searching for items:', error);
      });
  };

  // Function to handle item selection from the dropdown
  const onSelect = (value: any, option: { data: any; }) => {
    // You can access the selected item's data using option.data
    const selectedItem = option.data;
    console.log('Selected Item:', selectedItem);

    history.push(`/productdescription/${selectedItem.item_id}`);
  };

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
      <AutoComplete
        dropdownMatchSelectWidth={false}
        style={{ width: 400 }}
        options={options}
        onSelect={onSelect}
      >
        
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
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </AutoComplete>
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
