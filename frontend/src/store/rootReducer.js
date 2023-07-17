// Redux
import { combineReducers } from "redux";

// Import reducers
import { authReducers } from "../toolkit/auth/reducers";
import { cartReducers } from "../toolkit/cart/reducers";
import { categoryReducers } from "../toolkit/category/reducers";
import { colorReducers } from "../toolkit/color/reducers";
import { discountReducers } from "../toolkit/discounts/reducers";
import { imageReducers } from "../toolkit/image/reducers";
import { orderReducers } from "../toolkit/orders/reducers";
import { productReducers } from "../toolkit/product/reducers";
import { shippingReducers } from "../toolkit/shipping/reducers";
import { userReducers } from "../toolkit/user/reducers";
import { usersReducers } from "../toolkit/users/reducers";
import { variantReducers } from "../toolkit/variant/reducers";

// Export root reducer
const rootReducer = combineReducers({
  ...authReducers,
  ...cartReducers,
  ...categoryReducers,
  ...colorReducers,
  ...discountReducers,
  ...imageReducers,
  ...orderReducers,
  ...productReducers,
  ...shippingReducers,
  ...userReducers,
  ...usersReducers,
  ...variantReducers,
});

export default rootReducer;
