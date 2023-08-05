// Import slices
import discountSlice from "./discountSlice";
import discountUserSlice from "./discountUserSlice";
import discountProductSlice from "./discountProductSlice";

// Export discount reducer
export const discountReducers = {
  discounts: discountSlice,
  discountUsers: discountUserSlice,
  discountProducts: discountProductSlice,
};
