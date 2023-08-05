// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import {
  getDiscounts,
  getDiscount,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from "./actions";

// Initial state
const initialState = {
  discount: null,
  discounts: null,
  success: false,
  isLoading: false,
  error: null,
};

// Export discount slice
export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.discount = null;
      state.discounts = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get discounts
    builder.addCase(getDiscounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDiscounts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.discounts = action.payload;
    });
    builder.addCase(getDiscounts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get discount
    builder.addCase(getDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.discount = action.payload;
    });
    builder.addCase(getDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create discount
    builder.addCase(createDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update discount
    builder.addCase(updateDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete discount
    builder.addCase(deleteDiscount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteDiscount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = discountSlice.actions;
export default discountSlice.reducer;
