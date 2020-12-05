import React, { useState, useEffect } from "react";
import WishlistItem from "./components/WishlistItem";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import { productMapper } from "../../utils";
import { setWishlist, deleteWishlist } from "../../redux/actions/wishlist";
import { addCart } from "../../redux/actions/cart";

export default () => {
  const products = productMapper(useSelector((store) => store.wishlist));

  useEffect(() => {
    // Axios.get("/wishlist/user")
    //   .then((res) => setWishlist(res.data))
    //   .catch((err) => console.log(err));
    setWishlist();
  }, []);

  const handleDeleteWishlist = (id) => {
    // Axios.delete(`/wishlist/${id}`)
    //   .then(() =>
    //     Axios.get("wishlist/user")
    //       .then((res) => setWishlist(res.data))
    //       .catch((err) => console.log(err))
    //   )
    //   .catch((err) => console.log(err));
    deleteWishlist(id);
  };

  const handleAddToCart = (id) => {
    addCart(id, setWishlist);
  };

  return (
    <div className="user-wishlist">
      {products.map((item, index) => (
        <>
          <WishlistItem
            wishlist={item}
            key={index}
            onDelete={handleDeleteWishlist}
            onAdd={handleAddToCart}
          />
        </>
      ))}
    </div>
  );
};
