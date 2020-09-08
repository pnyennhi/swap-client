/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const Header = () => {
  return (
    <header className="header__area header__absolute sticky__header">
      <div className="container-fluid">
        <div className="row justify-space-between">
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
          <div className="col-md-6 col-sm-6 col-6 col-lg-2">
            <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
              <li className="wishlist">
                <a href="#"></a>
              </li>
              <li className="shopcart">
                <a className="cartbox_active" href="#"></a>
              </li>
              <li className="setting__bar__icon">
                <a className="setting__active" href="#"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
