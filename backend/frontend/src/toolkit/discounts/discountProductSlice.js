// Import redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting products for discount
export const getProducts = createAsyncThunk(
  "discount/getProducts",
  async (args, { rejectWithValue }) => {
    const { language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/products/getJustProducts?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Initial state
const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

// Export discount product slice
export const discountProductSlice = createSlice({
  name: "discountProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get discount products
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default discountProductSlice.reducer;
