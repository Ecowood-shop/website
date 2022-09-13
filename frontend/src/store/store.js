// REDUX
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// REDUCERS
import {
  systemUserReducer,
  systemCategoriesReducer,
  systemProductsReducer,systemProductReducer
} from "./reducers/systemReducers";
import { adminProductReducer } from "./reducers/adminReducers";

const reducer = combineReducers({
  systemUser: systemUserReducer,
  systemCategories: systemCategoriesReducer,
  systemProducts: systemProductsReducer,
  systemProduct:systemProductReducer,
  adminProduct: adminProductReducer,
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
