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

    case ADMIN.CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN.CREATE_PRODUCT_SUCCESS:
      return { loading: false, createSuccess: action.payload };
    case ADMIN.CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

      case ADMIN.UPDATE_PRODUCT_REQUEST:
        return { loading: true };
      case ADMIN.UPDATE_PRODUCT_SUCCESS:
        return { loading: false, success: action.payload };
      case ADMIN.UPDATE_PRODUCT_FAIL:
        return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const adminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.GET_USERS_REQUEST:
      return { loading: true };
    case ADMIN.GET_USERS_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN.GET_USERS_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN.GET_USER_REQUEST:
      return { loadingUser: true };
    case ADMIN.GET_USER_SUCCESS:
      return { loadingUser: false, user: action.payload };
    case ADMIN.GET_USER_FAIL:
      return { loadingUser: false, errorUser: action.payload };

    case ADMIN.DELETE_USER_REQUEST:
      return { loadingUser: true };
    case ADMIN.DELETE_USER_SUCCESS:
      return { loadingUser: false, success: action.payload };
    case ADMIN.DELETE_USER_FAIL:
      return { loadingUser: false, errorUser: action.payload };

    case ADMIN.UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN.UPDATE_USER_SUCCESS:
      return { loading: false, success: action.payload };
    case ADMIN.UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
