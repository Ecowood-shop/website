// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import actions
import {
  getVariants,
  createVariant,
  updateVariant,
  deleteVariant,
} from "./actions";

// Initial state
const initialState = {
  variants: null,
  success: false,
  isLoading: false,
  error: null,
};

// Export  variant slice
export const variantSlice = createSlice({
  name: "variants",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.variants = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get variants
    builder.addCase(getVariants.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVariants.fulfilled, (state, action) => {
      state.isLoading = false;
      state.variants = action.payload;
    });
    builder.addCase(getVariants.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create variant
    builder.addCase(createVariant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createVariant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createVariant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update variant
    builder.addCase(updateVariant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVariant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateVariant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete variant
    builder.addCase(deleteVariant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVariant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteVariant.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = variantSlice.actions;
export default variantSlice.reducer;
