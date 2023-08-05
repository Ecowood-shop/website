// Import slices
import productSlice from "./productSlice";
import latestProductSlice from "./latestProductSlice";
import similarProductSlice from "./similarProductSlice";

// export product reducer
export const productReducers = {
  products: productSlice,
  latestProducts: latestProductSlice,
  similarProducts: similarProductSlice,
};
