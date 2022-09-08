// CONSTANTS
import ADMIN from "../constants/adminConstants";

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN.DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: action.payload };
    case ADMIN.DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
