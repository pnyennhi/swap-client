import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  FileTextOutlined,
  HeartOutlined,
  WalletOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

export default () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/profile">
            <UserOutlined className="icon-bg bg-yellow" />
            Thông tin cá nhân
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            <FileTextOutlined className="icon-bg bg-green" />
            Đơn mua của tôi
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist">
            <HeartOutlined className="icon-bg bg-pink" />
            Danh sách yêu thích
          </NavLink>
        </li>
        <li>
          <NavLink to="/wallet">
            <WalletOutlined className="icon-bg bg-blue" />
            Ví của tôi
          </NavLink>
        </li>
        <li>
          <NavLink to="/change-password">
            <SafetyOutlined className="icon-bg bg-purple" />
            Đổi mật khẩu
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
