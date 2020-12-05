import * as types from "../constants";
import store from "../store";
import Axios from "../../Axios";
import Toast from "light-toast";

export function setCart() {
  Axios.get("/cart/user")
    .then((res) =>
      store.dispatch({
        type: types.SET_CART,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
}

export function addCart(id, resolve, reject) {
  Axios.post("/cart", { productId: id })
    .then(() =>
      Axios.get("/cart/user")
        .then((res) => {
          Toast.success("Sản phẩm đã được thêm vào giỏ hàng");
          if (resolve) resolve();

          store.dispatch({
            type: types.SET_CART,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          if (reject) reject();
        })
    )
    .catch((err) => {
      console.log(err);
      if (reject) reject();
    });
}

export function updateCart(productId, quantity, resolve, reject) {
  Axios.put("/cart", { productId, quantity })
    .then(() =>
      Axios.get("/cart/user")
        .then((res) => {
          if (resolve) resolve();
          store.dispatch({
            type: types.SET_CART,
            payload: res.data,
          });
        })
        .catch((err) => {
          console.log(err);
          if (reject) reject();
        })
    )
    .catch((err) => {
      Toast.fail(err.response.data);
      if (reject) reject();
    });
}

export function deleteCart(id) {
  Axios.delete(`/cart/${id}`)
    .then(() =>
      Axios.get("cart/user")
        .then((res) =>
          store.dispatch({
            type: types.SET_CART,
            payload: res.data,
          })
        )
        .catch((err) => console.log(err))
    )
    .catch((err) => console.log(err));
}

export function setSelectedItems(data) {
  store.dispatch({
    type: types.SET_SELECTED_ITEMS,
    payload: data,
  });
}

export function resetCart() {
  store.dispatch({ type: types.RESET_CART });
}
