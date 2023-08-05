// Import slices
import shippingSlice from "./shippingSlice";
import shippingPriceSlice from "./shippingPriceSlice";

// Export shipping reducer
export const shippingReducers = {
  shipping: shippingSlice,
  shippingPrices: shippingPriceSlice,
};
