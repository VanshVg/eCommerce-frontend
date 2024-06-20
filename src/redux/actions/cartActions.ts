import { SET_CART_DATA } from "../types";

export interface cartInterface {
  id: number;
  product_id: number;
  quantity: number;
}

export const setCartItem = (cartItems: cartInterface[]) => {
  return {
    type: SET_CART_DATA,
    payload: cartItems,
  };
};
