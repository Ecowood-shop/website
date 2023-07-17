// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios, useCustomFileAxios } from "../../utils/hooks/useAxios";

// Initial state
const initialState = {
  images: [],
  success: [],
  isLoading: false,
  error: null,
};

// API request for getting images of product
export const getImages = createAsyncThunk(
  "images/get",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      const { data } = await useCustomAxios.get(`/api/products/image/${id}/`);
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for creating image of product
export const createImage = createAsyncThunk(
  "image/create",
  async (args, { rejectWithValue }) => {
    const { formData } = args;
    try {
      await useCustomFileAxios.post("/api/products/upload/", formData);
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for deleting image of product
export const deleteImage = createAsyncThunk(
  "image/delete",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      await useCustomAxios.delete(`/api/products/image/delete/${id}/`);
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export image slice
export const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.images = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get images
    builder.addCase(getImages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.images = action.payload;
    });
    builder.addCase(getImages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create images
    builder.addCase(createImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete images
    builder.addCase(deleteImage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = imageSlice.actions;
export default imageSlice.reducer;
