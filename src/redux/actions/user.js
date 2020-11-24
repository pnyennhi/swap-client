import * as types from "../constants";
import store from "../store";

export function updateUser(data) {
  store.dispatch({
    type: types.UPDATE_USER,
    payload: data,
  });
}

export function deleteUser() {
  store.dispatch({
    type: types.DELETE_USER,
  });
}
