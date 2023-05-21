// REDUX
import { combineReducers, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// REDUCERS
import {
  systemCategoriesReducer,
  systemProductsReducer,
  systemProductReducer,
  systemLatestProductsReducer,
  systemSimilarProductsReducer,
} from "./reducers/systemReducers";
import {
  adminProductReducer,
  adminUserReducer,
  adminVariantReducer,
  adminColorReducer,
  adminImageReducer,
  adminCategoryReducer,
  adminOrderReducer,
} from "./reducers/adminReducers";
import {
  userReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./reducers/userReducers";
import { orderReducer } from "./reducers/orderReducers";
import { shippingReducer, cityReducer } from "./reducers/shippingReducer";
import {
  discountReducer,
  specificDiscountReducer,
} from "./reducers/discountReducers";

const reducer = combineReducers({
  systemCategories: systemCategoriesReducer,
  systemProducts: systemProductsReducer,
  systemProduct: systemProductReducer,
  systemSimilarProducts: systemSimilarProductsReducer,
  systemLatestProducts: systemLatestProductsReducer,
  adminProduct: adminProductReducer,
  adminUsers: adminUserReducer,
  adminVariants: adminVariantReducer,
  adminColors: adminColorReducer,
  adminImages: adminImageReducer,
  adminCity: cityReducer,
  // category
  adminCategories: adminCategoryReducer,
  adminOrders: adminOrderReducer,
  User: userReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  Order: orderReducer,
  shipping: shippingReducer,

  discounts: discountReducer,
  specificDiscount: specificDiscountReducer,
});

const shippingFromStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

const initialState = {
  shipping: { shipping: shippingFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
