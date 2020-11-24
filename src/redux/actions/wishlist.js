import * as types from "../constants";
import store from "../store";
import Axios from "../../Axios";
import Toast from "light-toast";

export function setWishlist() {
  Axios.get("/wishlist/user")
    .then((res) =>
      store.dispatch({
        type: types.SET_WISHLIST,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
}

export function addWishlist(productId) {
  Axios.post(`/wishlist`, { productId })
    .then(() => {
      Toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      Axios.get("wishlist/user")
        .then((res) =>
          store.dispatch({
            type: types.ADD_WISHLIST,
            payload: res.data,
          })
        )
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

export function deleteWishlist(id) {
  Axios.delete(`/wishlist/${id}`)
    .then(() =>
      Axios.get("wishlist/user")
        .then((res) =>
          store.dispatch({
            type: types.DELETE_WISHLIST,
            payload: res.data,
          })
        )
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
}

export function resetWishlist() {
  store.dispatch({ type: types.RESET_WISHLIST });
}
