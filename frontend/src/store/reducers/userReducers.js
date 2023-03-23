// CONSTANTS
import USER from "../constants/userConstants";

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.FORGOT_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER.FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload };
    case USER.FORGOT_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.RESET_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER.RESET_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload };
    case USER.RESET_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.LOGIN_REQUEST:
      return { ...state, loadingUser: true, errorLogin: false };
    case USER.LOGIN_SUCCESS:
      return { ...state, loadingUser: false, user: action.payload };
    case USER.LOGIN_FAIL:
      return { ...state, loadingUser: false, errorLogin: action.payload };
    case USER.VERIFICATION_REQUEST:
      return { ...state, loadingUser: true, errorLogin: false };
    case USER.VERIFICATION_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        successVerification: action.payload,
      };
    case USER.VERIFICATION_FAIL:
      return {
        ...state,
        loadingUser: false,
        errorVerification: action.payload,
      };

    case USER.LOGOUT:
      return { loadingUser: false };

    case USER.REGISTER_REQUEST:
      return { ...state, loadingRegister: true };

    case USER.REGISTER_SUCCESS:
      return {
        ...state,
        loadingRegister: false,
        registerSuccess: true,
      };
    case USER.REGISTER_FAIL:
      return {
        ...state,
        loadingRegister: false,
        errorRegister: action.payload,
      };

    case USER.GET_PROFILE_REQUEST:
      return { ...state, loadingUser: true };

    case USER.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loadingUser: false,
        user: action.payload,
        success: false,
      };
    case USER.GET_PROFILE_FAIL:
      return { ...state, loadingUser: false, errorProfile: action.payload };

    case USER.GET_ORDERS_REQUEST:
      return { ...state, loading: true, success: false };
    case USER.GET_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };
    case USER.GET_ORDERS_FAIL:
      return { ...state, loading: false, errorOrders: action.payload };

    case USER.PROFILE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER.PROFILE_UPDATE_SUCCESS:
      return { ...state, loading: false, success: true };
    case USER.PROFILE_UPDATE_FAIL:
      return { ...state, loading: false, errorUpdate: action.payload };

    case USER.GET_CART_REQUEST:
      return { ...state, loadingCart: true };
    case USER.GET_CART_SUCCESS:
      return {
        ...state,
        loadingCart: false,
        cart: action.payload,
        success: false,
        successCartAdd: false,
      };
    case USER.GET_CART_FAIL:
      return { ...state, loadingCart: false, error: action.payload };

    case USER.CART_UPDATE_REQUEST:
      return { ...state, loadingCart: true };
    case USER.CART_UPDATE_SUCCESS:
      return { ...state, loadingCart: false, success: true };
    case USER.CART_UPDATE_FAIL:
      return { ...state, loadingCart: false, error: action.payload };

    case USER.CART_ADD_REQUEST:
      return { ...state, loadingCart: true };
    case USER.CART_ADD_SUCCESS:
      return { ...state, loadingCart: false, successCartAdd: true };
    case USER.CART_ADD_FAIL:
      return { ...state, loadingCart: false, error: action.payload };

    case USER.CART_ERROR_RESET:
      return { ...state, error: false };

    case USER.CART_DELETE_REQUEST:
      return { ...state, loadingCart: true };
    case USER.CART_DELETE_SUCCESS:
      return { ...state, loadingCart: false, success: true };
    case USER.CART_DELETE_FAIL:
      return { ...state, loadingCart: false, error: action.payload };

    default:
      return state;
  }
};
