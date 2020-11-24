import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import "./Detail.css";
import Product from "./components/Product";
import ProductInfo from "./components/ProductInfo";
import Header from "../../layouts/Header/Header";
import CategoryMenu from "../../layouts/CategoryMenu/CategoryMenu";
import Axios from "../../Axios";
import { useSelector } from "react-redux";
import {
  setWishlist,
  deleteWishlist,
  addWishlist,
} from "../../redux/actions/wishlist";
import { addCart } from "../../redux/actions/cart";
import { checkProduct } from "../../utils";

export default ({ id }) => {
  const [product, setProduct] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const [isInCart, setIsInCart] = useState(false);

  const wishlist = useSelector((store) => store.wishlist);
  const cart = useSelector((store) => store.cart.cart);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    setIsInCart(checkProduct(cart, id));

    Axios.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const wishlistId = wishlist.map((item) => item.productId);

    setIsLiked(wishlistId.includes(Number(id)));
  }, [wishlist]);

  const handleLike = async () => {
    // const wishlistId = wishlist.map((item) => item.productId);

    if (!checkProduct(wishlist, id)) {
      addWishlist(id);
    } else deleteWishlist(id);
  };

  const handleAddToCart = () => {
    addCart(id, setWishlist);
  };

  return (
    <>
      <Header />
      <CategoryMenu />
      <div className="maincontent bg--white pt--80 pb--55">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              {product && (
                <>
                  <Product
                    userId={user?.id}
                    product={product}
                    isLiked={isLiked}
                    isInCart={isInCart}
                    onLike={handleLike}
                    onAdd={handleAddToCart}
                  />
                  <ProductInfo description={product.description} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
