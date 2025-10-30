import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../domains/product/slices/productSlice";
import cartReducer from "../domains/cart/slices/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
