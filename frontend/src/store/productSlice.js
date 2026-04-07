import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../utils/api";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ category = "", sort = "" } = {}, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (sort) params.append("sort", sort);

      const query = params.toString() ? `?${params.toString()}` : "";

      return await fetchProducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { clearProductsError } = productSlice.actions;
export default productSlice.reducer;


