/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import "./Header.css";
import MiniSearch from "../../components/MiniSearch/MiniSearch";
import Dropdown from "./components/UserDropdown";

const Header = ({ hideSearch, hideCart, isSticky }) => {
  const [sticky, setSticky] = React.useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [prefix, setPrefix] = useState("product");
  const [search, setSearch] = useState("");

  const user = useSelector((store) => store.user);
  const wishlist = useSelector((store) => store.wishlist);
  const cart = useSelector((store) => store.cart.cart);

  let history = useHistory();
  let location = useLocation();

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  const handleSearch = (event) => {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      history.push(`/search/${prefix}/?q=${search}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
    }
  }, [location]);

  return (
    <header
      id="header"
      className={`header__area sticky__header ${
        sticky || isSticky ? "is-sticky" : ""
      }`}
      // className={`header__area sticky__header is-sticky`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-sm-6 col-6 col-lg-3">
            <div className="logo">
              <Link to="/">
                <img
                  src={require("../../assets/images/swap-logo.png")}
                  alt="logo images"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-12 d-none d-lg-block">
            {!hideSearch && (
              <MiniSearch
                value={search}
                onChange={(value) => setSearch(value)}
                onEnter={handleSearch}
                onChangePrefix={(value) => setPrefix(value)}
              />
            )}
          </div>
          <div className="col-md-6 col-sm-6 col-6 col-lg-3">
            <ul className="header__sidebar__right d-flex justify-content-end align-items-center">
              {!hideCart && (
                <>
                  <li className="icon">
                    <Badge
                      count={wishlist.length}
                      style={{ background: "#d4805d" }}
                    >
                      <Link to="/wishlist">
                        <HeartOutlined />
                      </Link>
                    </Badge>
                  </li>
                  <li className="icon">
                    <Badge
                      count={cart.length}
                      style={{ background: "#d4805d" }}
                    >
                      <Link to="/cart">
                        <ShoppingCartOutlined />
                      </Link>
                    </Badge>
                  </li>
                </>
              )}
              <li
                className="icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <a>
                  {!user ? (
                    <Link to="/login">Đăng nhập</Link>
                  ) : (
                    <Avatar src={user.avatarImage} />
                  )}
                </a>
                {showDropdown ? (
                  <Dropdown isLoggedIn={user} onToggle={setShowDropdown} />
                ) : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
