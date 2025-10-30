import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../product/slices/productSlice";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],
};

const saveCart = (items: CartItem[]) => {
  if (typeof window !== "undefined")
    localStorage.setItem("cart", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const idx = state.items.findIndex((i) => i.id === action.payload);
      if (idx !== -1) {
        state.items.splice(idx, 1);
        saveCart(state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
