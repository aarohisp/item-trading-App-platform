import React, { Dispatch, SetStateAction } from "react";
import { Menu, MenuProps } from "antd";
import { useSelector } from "react-redux";
import styles from "./SidebarContent.module.css";
import CustomScrollbars from "../../util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import { THEME_TYPE_LITE } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";

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

const items: MenuItem[] = [getItem("Home", "1", <i className="icon icon-home" />), getItem("Dashhboard", "2", <i className="icon icon-chart" />), getItem("Menu", "3", <i className="icon icon-feedback" />, [getItem("Sub Menu 1", "report-sub-1"), getItem("Sub Menu 2", "report-sub-2"), getItem("Sub Menu 3", "report-sub-3"), getItem("Sub Menu 4", "report-sub-4")])];

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }: SidebarContentProps) => {
  const { themeType } = useSelector(({ settings }: RootState) => settings);
  const pathname = useSelector(({ common }: RootState) => common.pathname);
  const selectedKeys = pathname?.substr(1)?.split("/")?.at(0);
  const defaultOpenKeys = selectedKeys?.split("/")[1];

  return (
    <>
      {/* hamburger icon */}
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

      {/* custom scrollbar when window height is small */}
      <CustomScrollbars className="gx-layout-sider-scrollbar">
        <Menu style={{ paddingTop: "10px" }} defaultOpenKeys={[defaultOpenKeys!]} defaultSelectedKeys={[selectedKeys!]} theme={themeType === THEME_TYPE_LITE ? "light" : "dark"} mode="inline" items={items}></Menu>
      </CustomScrollbars>
    </>
  );
};

export default React.memo(SidebarContent);
