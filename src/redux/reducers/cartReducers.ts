import { createSlice } from "@reduxjs/toolkit";
import { cartInterface } from "../../interfaces";

const initialState: { cart: cartInterface[] } = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const cartItem = state.cart.find(
        (item: cartInterface) =>
          item.productData.id === action.payload.productData.id
      );
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeItem(state, action) {
      const cartItem = state.cart.filter(
        (item: cartInterface) => item.productData.id !== action.payload.id
      );
      state.cart = cartItem;
    },
    quantityDecrement(state, action) {
      const cartItem = state.cart.find(
        (item: cartInterface) => item.productData.id === action.payload.id
      );
      if (cartItem) {
        cartItem.quantity--;
      }
    },
    quantityIncrement(state, action) {
      const cartItem = state.cart.find(
        (item: cartInterface) => item.productData.id === action.payload.id
      );

      if (cartItem) {
        cartItem.quantity++;
      }
    },
    checkout(state) {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  removeItem,
  quantityDecrement,
  quantityIncrement,
  checkout,
} = cartSlice.actions;
