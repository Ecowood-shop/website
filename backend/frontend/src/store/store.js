// Import Redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import root reducer
import rootReducer from "./rootReducer";

// Export store
const store = configureStore({
  reducer: rootReducer,
});
export default store;

