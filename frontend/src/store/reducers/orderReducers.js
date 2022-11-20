// CONSTANTS
import ORDER from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER.CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER.CREATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER.CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };


      case ORDER.DELIVERED_REQUEST:
        return { ...state, loading: true };
      case ORDER.DELIVERED_SUCCESS:
        return { ...state, loading: false, success: true };
      case ORDER.DELIVERED_FAIL:
        return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
