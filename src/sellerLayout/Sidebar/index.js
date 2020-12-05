import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  BarChartOutlined,
  SkinOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/swap-logo.png";

const Sidebar = ({ collapsed, onCollapse }) => (
  <ProSidebar collapsed={collapsed}>
    <SidebarHeader>
      <Link to="/seller">
        <img src={logo} alt="logo" width="60%" />
        <h6 className="mb-3" style={{ color: "#c3c3c3", fontSize: 14 }}>
          KÊNH NGƯỜI BÁN
        </h6>
      </Link>
    </SidebarHeader>
    <SidebarContent>
      <Menu iconShape="circle">
        <MenuItem icon={<BarChartOutlined />}>
          <NavLink to="/seller/dashboard">Thống kê</NavLink>
        </MenuItem>
        <SubMenu title="Quản lý sản phẩm" icon={<SkinOutlined />} defaultOpen>
          <MenuItem>
            <NavLink to="/seller/products/list">Tất cả sản phẩm</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/seller/products/add">Thêm sản phẩm</NavLink>
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<BarChartOutlined />}>
          <NavLink to="/seller/orders">Quản lý đơn hàng</NavLink>
        </MenuItem>

        <SubMenu title="Quản lý tài chính" icon={<SkinOutlined />} defaultOpen>
          <MenuItem>
            <NavLink to="/seller/revenue">Doanh thu</NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/seller/wallet">Ví của tôi</NavLink>
          </MenuItem>
        </SubMenu>
      </Menu>
    </SidebarContent>
    <SidebarFooter className="text-center" onClick={() => onCollapse()}>
      {collapsed ? (
        <MenuUnfoldOutlined
          style={{ fontSize: 20, padding: "15px 0", cursor: "pointer" }}
        />
      ) : (
        <MenuFoldOutlined
          style={{ fontSize: 20, padding: "15px 0", cursor: "pointer" }}
        />
      )}
    </SidebarFooter>
  </ProSidebar>
);

export default Sidebar;
