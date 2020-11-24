import React from "react";
import { NavLink } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { BarChartOutlined, SkinOutlined } from "@ant-design/icons";

const Sidebar = () => (
  <ProSidebar>
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
  </ProSidebar>
);

export default Sidebar;
