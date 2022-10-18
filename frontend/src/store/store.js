// REDUX
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// REDUCERS
import {
  systemUserReducer,
  systemCategoriesReducer,
  systemProductsReducer,
  systemProductReducer,
  systemLatestProductsReducer,
  systemSimilarProductsReducer
} from "./reducers/systemReducers";
import {
  adminProductReducer,
  adminUserReducer,
  adminVariantReducer,
  adminColorReducer,
  adminImageReducer
} from "./reducers/adminReducers";
import { userReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  systemUser: systemUserReducer,
  systemCategories: systemCategoriesReducer,
  systemProducts: systemProductsReducer,
  systemProduct: systemProductReducer,
  systemSimilarProducts:systemSimilarProductsReducer,
  systemLatestProducts: systemLatestProductsReducer,
  adminProduct: adminProductReducer,
  adminUsers: adminUserReducer,
  adminVariants:adminVariantReducer,
  adminColors:adminColorReducer,
  adminImages:adminImageReducer,
  User:userReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  
const initialState = { systemUser: { user: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
