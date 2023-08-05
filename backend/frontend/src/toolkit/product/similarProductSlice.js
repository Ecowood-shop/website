// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import axios
import { useAxios } from "../../utils/hooks/useAxios";

// Initial state
const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

// API request for getting similar products by category
export const getSimilarProducts = createAsyncThunk(
  "similarProducts/get",
  async (args, { rejectWithValue }) => {
    const { category, language = "geo" } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/latest/${category}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export latest similar products slice
export const similarProductSlice = createSlice({
  name: "similarProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get similar products
    builder.addCase(getSimilarProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getSimilarProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default similarProductSlice.reducer;
