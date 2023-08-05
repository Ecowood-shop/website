// Import slices
import userReducer from "./userSlice";
import userUpdateReducer from "./userUpdateSlice";
import userOrdersReducer from "./userOrderSlice";

// Export user reducer
export const userReducers = {
  user: userReducer,
  userUpdate: userUpdateReducer,
  userOrders: userOrdersReducer,
};
