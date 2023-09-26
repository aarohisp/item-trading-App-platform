import React, { Dispatch, SetStateAction } from "react";
import { Menu, MenuProps, Layout } from "antd";
import { useSelector } from "react-redux";
import styles from "./SidebarContent.module.css";
import CustomScrollbars from "../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import { GithubOutlined } from "@ant-design/icons"; // Import GithubOutlined
import { THEME_TYPE_LITE, NAV_STYLE_NO_HEADER_MINI_SIDEBAR } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";

// Define TAB_SIZE
const TAB_SIZE = 992;

type SidebarContentProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

const items: MenuItem[] = [getItem("Home", "1", <i className="icon icon-home" />), getItem("Dashhboard", "2", <i className="icon icon-chart" />), getItem("About Us", "3", <i className="icon icon-feedback" />, [getItem("SevaSahayog", "report-sub-1"), getItem("HelpHive", "report-sub-2")])];

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }: SidebarContentProps) => {
  const { themeType, navStyle, width } = useSelector(({ settings, common }: RootState) => ({ ...settings, ...common }));
  const pathname = useSelector(({ common }: RootState) => common.pathname);
  const selectedKeys = pathname?.substr(1)?.split("/")?.at(0);
  const defaultOpenKeys = selectedKeys?.split("/")[1];
  const { Sider } = Layout;

  // Define drawerStyle based on navStyle
  let drawerStyle = "";
  if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
    drawerStyle = "gx-mini-sidebar";
  }

  return (
    <Sider className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? "gx-layout-sider-dark" : null}`} trigger={null} collapsed={width < TAB_SIZE ? false : sidebarCollapsed || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR} theme={themeType === THEME_TYPE_LITE ? "light" : "dark"} collapsible>
      {/* Dark Blue Section */}
      <div className={styles.darkBlueSection}>
        {/* Conditionally render GitHub icon or website name */}
        {sidebarCollapsed ? (
          // When collapsed, display the GitHub icon
          <GithubOutlined className={styles.githubIcon} />
        ) : (
          // When expanded, display the website name
          <div className={styles.websiteName}>HelpHive</div>
        )}
        <div className={styles.buttonSection}>
          {/* Hamburger Icon */}
          <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
        </div>
      </div>

      {/* Display the site name when the sidebar is expanded */}
      <div className={styles.siteNameToggle}></div>

      {/* custom scrollbar when window height is small */}
      <CustomScrollbars className="gx-layout-sider-scrollbar">
        <Menu style={{ paddingTop: "50x" }} defaultOpenKeys={[defaultOpenKeys!]} defaultSelectedKeys={[selectedKeys!]} theme={themeType === THEME_TYPE_LITE ? "light" : "dark"} mode="inline" items={items}></Menu>
      </CustomScrollbars>
    </Sider>
  );
};

export default React.memo(SidebarContent);
