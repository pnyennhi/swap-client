import * as types from "../constants";

const initialState = null;

export default function User(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_USER:
      return { ...state, ...action.payload };
    case types.DELETE_USER:
      return null;

    default:
      return state;
  }
}
