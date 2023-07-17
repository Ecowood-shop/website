// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  shipping: null,
};

// Export shipping price slice
export const shippingSlice = createSlice({
  name: "shippingPrices",
  initialState,
  reducers: {
    // Save shipping method
    saveShippingMethod: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem("shipping", JSON.stringify(payload));
    },

    // Save shipping details
    saveShippingDetails: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem("shipping", JSON.stringify(payload));
    },

    // Save payment method
    savePaymentMethod: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem("shipping", JSON.stringify(payload));
    },
  },
});

// Export additional action
export const { savePaymentMethod, saveShippingDetails, saveShippingMethod } =
  shippingSlice.actions;
export default shippingSlice.reducer;
