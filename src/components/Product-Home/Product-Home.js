/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";
import "./Product-Home.css";
import { addCart, setCart } from "../../redux/actions/cart";
import { addWishlist, setWishlist } from "../../redux/actions/wishlist";

const Product = ({ name, price, size, imageSrc, id }) => {
  let history = useHistory();

  const handleAddToCart = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    addCart(id, setCart);
  };

  const handleAddToWishlist = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    addWishlist(id, setWishlist);
  };

  return (
    <div
      className="product product__style--3"
      onClick={() => history.push(`/item/${id}`)}
    >
      <div className="product__thumb">
        <a className="first__img">
          <img
            src={
              imageSrc ? imageSrc : require("../../assets/images/books/1.jpg")
            }
            alt="product"
          />
        </a>
        <div className="action">
          <div className="actions_inner">
            <ul className="add_to_links">
              <li>
                <a
                  className="wishlist"
                  title="Thêm vào giỏ hàng"
                  onClick={(event) => handleAddToCart(event)}
                >
                  <i className="bi bi-shopping-cart-full"></i>
                </a>
              </li>
              <li>
                <a
                  className="compare"
                  title="Thêm vào yêu thích"
                  onClick={(event) => handleAddToWishlist(event)}
                >
                  <i className="bi bi-heart-beat"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="product__content content--center">
        <h4>
          <a href="single-product.html">{name}</a>
        </h4>
        <p className="mb-0 size">Size: {size}</p>
        <ul className="prize">
          <li>$ {price}</li>
        </ul>
      </div>
    </div>
    // </Link>
  );
};

export default Product;
