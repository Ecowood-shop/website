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

// API request for getting latest products
export const getLatestProducts = createAsyncThunk(
  "latestProducts/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo" } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/latest/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export latest products slice
export const latestProductSlice = createSlice({
  name: "latestProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get latest products
    builder.addCase(getLatestProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLatestProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getLatestProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default latestProductSlice.reducer;
