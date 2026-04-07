import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartApi, removeFromCartApi } from "../utils/api";

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    return await getCartApi();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, thunkAPI) => {
    try {
      await removeFromCartApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default cartSlice.reducer;