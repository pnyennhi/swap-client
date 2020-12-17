/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect } from "react";
import { deleteUser } from "../../../redux/actions/user";
import { resetWishlist } from "../../../redux/actions/wishlist";
import { resetCart } from "../../../redux/actions/cart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default ({ isLoggedIn, onToggle }) => {
  const ref = useRef();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (event) => {
    const { target } = event;

    if (!ref.current.contains(target)) {
      onToggle(false);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("TOKEN_AUTH");
    deleteUser();
    resetCart();
    resetWishlist();
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      ref={ref}
      className="searchbar__content setting__block is-visible"
    >
      <div
        className="content-inner"
        style={{ width: isLoggedIn ? "230px" : "150px" }}
      >
        {isLoggedIn ? (
          <>
            <div className="switcher-currency">
              <p className="text-left">Hi, {user.username}</p>
              <strong className="label switcher-label">
                <span>Cá nhân</span>
              </strong>
              <div className="switcher-options">
                <div className="switcher-currency-trigger">
                  <div className="setting__menu">
                    <span>
                      <Link to="/profile">Trang cá nhân</Link>
                    </span>
                    <span>
                      <Link to="/orders">Đơn mua</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="switcher-currency">
              <strong className="label switcher-label">
                <Link to="/seller" target="_blank">
                  <span>Kênh người bán</span>
                </Link>
              </strong>
            </div>
            <div className="switcher-currency">
              <strong className="label switcher-label">
                <span onClick={() => handleLogOut()}>Đăng xuất</span>
              </strong>
            </div>
          </>
        ) : (
          <>
            <div className="switcher-currency">
              <strong className="label switcher-label">
                <span>
                  <Link to="/login">Đăng nhập</Link>
                </span>
              </strong>
            </div>
            <div className="switcher-currency">
              <strong className="label switcher-label">
                <span>Đăng ký</span>
              </strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
