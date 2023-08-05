// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import {
  getShippingPrice,
  getShippingPrices,
  createShippingPrice,
  updateShippingPrice,
  deleteShippingPrice,
} from "./actions";

// Initial state
const initialState = {
  shippingPrice: null,
  shippingPrices: [],
  success: false,
  isLoading: false,
  error: null,
};

// Export shipping price slice
export const shippingPriceSlice = createSlice({
  name: "shippingPrices",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.shippingPrice = null;
      state.shippingPrices = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get shippingPrices
    builder.addCase(getShippingPrices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShippingPrices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shippingPrices = action.payload;
    });
    builder.addCase(getShippingPrices.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get shippingPrice
    builder.addCase(getShippingPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getShippingPrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.shippingPrice = action.payload;
    });
    builder.addCase(getShippingPrice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create shippingPrice
    builder.addCase(createShippingPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createShippingPrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createShippingPrice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update shippingPrice
    builder.addCase(updateShippingPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateShippingPrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateShippingPrice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete shippingPrice
    builder.addCase(deleteShippingPrice.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteShippingPrice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteShippingPrice.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = shippingPriceSlice.actions;
export default shippingPriceSlice.reducer;
