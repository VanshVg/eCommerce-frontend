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
          item.product_data &&
          JSON.parse(item.product_data).id === action.payload.product_data.id
      );
      if (cartItem) {
        cartItem.quantity += action.payload.quantity;
      } else {
        state.cart.push({
          product_data: JSON.stringify(action.payload.product_data),
          quantity: action.payload.quantity,
        });
      }
      console.log(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      console.log("sadsadsadasd", localStorage.getItem("cart"));
    },
    removeItem(state, action) {
      console.log(action.payload);
      const cartItem = state.cart.filter(
        (item: cartInterface) =>
          JSON.parse(item.product_data)?.id !== action.payload.id
      );
      console.log(cartItem);
      state.cart = cartItem;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    quantityDecrement(state, action) {
      const cartItem = state.cart.find(
        (item: cartInterface) =>
          JSON.parse(item.product_data)?.id === action.payload.id
      );
      if (cartItem) {
        cartItem.quantity--;
        const modifiedCart = state.cart.map((item) => {
          if (
            JSON.parse(cartItem.product_data as string) ===
            JSON.parse(item.product_data).id
          ) {
            return { ...item, quantity: cartItem?.quantity };
          }
          return item;
        });
        state.cart = modifiedCart;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    quantityIncrement(state, action) {
      const cartItem = state.cart.find(
        (item: cartInterface) =>
          JSON.parse(item.product_data).id === action.payload.id
      );
      if (cartItem) {
        cartItem.quantity++;
        const modifiedCart = state.cart.map((item) => {
          if (
            JSON.parse(cartItem.product_data as string) ===
            JSON.parse(item.product_data).id
          ) {
            return { ...item, quantity: cartItem?.quantity };
          }
          return item;
        });
        state.cart = modifiedCart;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
