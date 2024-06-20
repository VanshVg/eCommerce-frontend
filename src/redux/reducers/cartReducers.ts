import { PayloadAction } from "@reduxjs/toolkit";
import { SET_CART_DATA } from "../types";

const initialState = [
  {
    id: 0,
    product_id: 0,
    quantity: 0,
  },
];

const cartReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_CART_DATA:
      return {
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
