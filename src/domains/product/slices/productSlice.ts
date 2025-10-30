import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../api/productApi";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  filter: string;
  search: string;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  filter: "",
  search: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter(state, action: { payload: string }) {
      state.filter = action.payload;
    },
    setSearch(state, action: { payload: string }) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setFilter, setSearch } = productsSlice.actions;
export default productsSlice.reducer;
