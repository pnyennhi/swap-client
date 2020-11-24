import * as types from "../constants";

const initialState = { cart: [], selectedItems: [] };

export default function Cart(state = initialState, action) {
  switch (action.type) {
    case types.SET_CART:
      return { ...state, cart: action.payload };
    case types.ADD_CART:
      return { ...state, cart: action.payload };
    case types.UPDATE_CART:
      return { ...state, cart: action.payload };
    case types.DELETE_CART:
      return { ...state, cart: action.payload };
    case types.RESET_CART:
      return { cart: [], selectedItems: [] };
    case types.SET_SELECTED_ITEMS:
      return { ...state, selectedItems: action.payload };

    default:
      return state;
  }
}
