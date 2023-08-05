// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./actions";

// Initial state
const initialState = {
  category: null,
  categories: [],
  success: false,
  isLoading: false,
  error: null,
};

// Export category slice
export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.category = null;
      state.categories = [];
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // Get categories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get category
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create category
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update category
    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
