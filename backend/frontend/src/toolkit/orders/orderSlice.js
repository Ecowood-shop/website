// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import {
  getOrders,
  createOrder,
  getOrder,
  delivered,
  deleteOrder,
} from "./actions";

// Initial state
const initialState = {
  order: null,
  orders: [],
  success: false,
  isLoading: false,
  error: null,
};

// Export order slice
export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.order = null;
      state.orders = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Orders
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get Order
    builder.addCase(getOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create order
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.success = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Order delivered
    builder.addCase(delivered.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(delivered.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(delivered.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Delete order
    builder.addCase(deleteOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
