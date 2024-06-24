import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
