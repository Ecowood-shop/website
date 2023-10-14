// Import redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import  axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// Initial state
const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

// API request for getting user orders
export const getOrders = createAsyncThunk(
  "user/getOrders",
  async (args, { rejectWithValue }) => {
    const { page, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `api/orders/myorders/?page=${page}&language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export user order slice
export const userOrderSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get user orders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoadingOrders = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoadingOrders = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoadingOrders = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = userOrderSlice.actions;
export default userOrderSlice.reducer;
