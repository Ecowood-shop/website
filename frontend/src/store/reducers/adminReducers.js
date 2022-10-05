// CONSTANTS
import ADMIN from "../constants/adminConstants";

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.DELETE_PRODUCT_REQUEST:
      return { loading: true, success: false };
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
      return { loading: false, success: true };
    case ADMIN.UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN.UPDATE_PRODUCT_RESET:
      return { success: false };

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
}



  export const adminVariantReducer = (state = {}, action) => {
    switch (action.type) {
      case ADMIN.GET_VARIANTS_REQUEST:
        return { loading: true };
      case ADMIN.GET_VARIANTS_SUCCESS:
        return { loading: false, variants: action.payload };
      case ADMIN.GET_VARIANTS_FAIL:
        return { loading: false, error: action.payload };
  
        case ADMIN.DELETE_VARIANT_REQUEST:
          return { loading: true };
        case ADMIN.DELETE_VARIANT_SUCCESS:
          return { loading: false, success: action.payload };
        case ADMIN.DELETE_VARIANT_FAIL:
          return { loading: false, error: action.payload };

        case ADMIN.UPDATE_VARIANT_REQUEST:
          return { loading: true };
        case ADMIN.UPDATE_VARIANT_SUCCESS:
          return { loading: false, successUpdate: action.payload };
        case ADMIN.UPDATE_VARIANT_FAIL:
          return { loading: false, error: action.payload };

          case ADMIN.CREATE_VARIANT_REQUEST:
          return { loading: true };
        case ADMIN.CREATE_VARIANT_SUCCESS:
          return { loading: false, successCreate: action.payload };
        case ADMIN.CREATE_VARIANT_FAIL:
          return { loading: false, error: action.payload };
          
        default:
          return state;
      }
};


export const adminColorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN.GET_COLORS_REQUEST:
      return { loading: true };
    case ADMIN.GET_COLORS_SUCCESS:
      return { loading: false, colors: action.payload };
    case ADMIN.GET_COLORS_FAIL:
      return { loading: false, error: action.payload };
      default:
        return state;
    }
};