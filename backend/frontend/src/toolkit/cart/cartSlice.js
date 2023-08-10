// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import { getCart, addToCart, updateCart, deleteCart } from "./actions";

// Initial state
const initialState = {
  cart: null,
  isLoading: false,
  success: false,
  error: null,
};

// Export cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get cart
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.cart = null;
      state.error = action.payload;
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update cart
    builder.addCase(updateCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete cart
    builder.addCase(deleteCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = cartSlice.actions;
export default cartSlice.reducer;
