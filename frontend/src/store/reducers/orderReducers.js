// CONSTANTS
import ORDER from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER.CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER.CREATE_SUCCESS:
      return { ...state, loading: false, success: true,order:action.payload };
    case ORDER.CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };


    case ORDER.GET_REQUEST:
      return { ...state, loading: true };
    case ORDER.GET_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case ORDER.GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ORDER.ADMIN_REQUEST:
      return { loading: true };
    case ORDER.ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER.ADMIN_FAIL:
      return {loading: false, error: action.payload };

    case ORDER.CLEAR_ORDER:
      return { };

    default:
      return state;
  }
};
