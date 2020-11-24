import * as types from "../constants";

const initialState = [];

export default function Wishlist(state = initialState, action) {
  switch (action.type) {
    case types.SET_WISHLIST:
      return action.payload;
    case types.ADD_WISHLIST:
      return action.payload;
    case types.DELETE_WISHLIST:
      return action.payload;
    case types.RESET_WISHLIST:
      return [];

    default:
      return state;
  }
}
