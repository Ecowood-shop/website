// constants
import DISCOUNT from "../constants/discountConstants";

export const discountReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT.GET_DISCOUNT_REQUEST:
      return { ...state, loading: true, success: false, error: "" };
    case DISCOUNT.GET_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: action.payload,
        success: false,
      };
    case DISCOUNT.GET_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DISCOUNT.UPDATE_DISCOUNT_REQUEST:
      return { ...state, loading: true, success: false };
    case DISCOUNT.UPDATE_DISCOUNT_SUCCESS:
      return { ...state, loading: false, success: true };
    case DISCOUNT.UPDATE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DISCOUNT.DELETE_DISCOUNT_REQUEST:
      return { ...state, loading: true, success: false };
    case DISCOUNT.DELETE_DISCOUNT_SUCCESS:
      return { ...state, loading: false, success: true };
    case DISCOUNT.DELETE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DISCOUNT.CREATE_DISCOUNT_REQUEST:
      return { ...state, loading: true, success: false };
    case DISCOUNT.CREATE_DISCOUNT_SUCCESS:
      return { ...state, loading: false, success: true };
    case DISCOUNT.CREATE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DISCOUNT.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true, success: false };
    case DISCOUNT.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        success: false,
      };
    case DISCOUNT.GET_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case DISCOUNT.GET_USERS_REQUEST:
      return { ...state, loading: true, success: false };
    case DISCOUNT.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        success: false,
      };
    case DISCOUNT.GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    default:
      return state;
  }
};
