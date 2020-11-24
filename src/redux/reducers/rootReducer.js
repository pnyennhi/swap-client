import { combineReducers } from "redux";
import user from "./user";
import wishlist from "./wishlist";
import cart from "./cart";

const rootReducer = combineReducers({
  user,
  wishlist,
  cart,
});

export default rootReducer;
