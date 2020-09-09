/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Header = () => {
  return (
    <header className="header__area header__absolute sticky__header is-sticky">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-6 col-lg-2">
            <div className="logo">
              <a href="index.html">
                <img
                  src={require("../assets/images/logo/logo.png")}
                  alt="logo images"
                />
              </a>
            </div>
          </div>
          <div class="col-lg-8 d-none d-lg-block">
            <nav class="mainmenu__nav">
              <ul class="meninmenu d-flex justify-content-start">
                <li class="drop with--one--item">
                  <a href="index.html">Thời trang nam</a>
                </li>
                <li class="drop">
                  <a href="shop-grid.html">Thời trang nữ</a>
                </li>
                <li class="drop">
                  <a href="shop-grid.html">Thời trang trẻ em</a>
                </li>
                <li class="drop">
                  <a href="#">Giày dép</a>
                </li>
                <li class="drop">
                  <a href="blog.html">Phụ kiện</a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-md-6 col-sm-6 col-6 col-lg-2">
            <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
              <li className="icon">
                <a href="#">
                  <SearchOutlined
                    style={{ color: "white", fontSize: "16px" }}
                  />
                </a>
              </li>
              <li className="icon">
                <a href="#">
                  <HeartOutlined style={{ color: "white", fontSize: "16px" }} />
                </a>
              </li>
              <li className="icon">
                <a href="#">
                  <ShoppingCartOutlined
                    style={{ color: "white", fontSize: "16px" }}
                  />
                </a>
              </li>
              <li className="icon">
                <a href="#">
                  <UserOutlined style={{ color: "white", fontSize: "16px" }} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
