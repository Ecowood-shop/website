// CONSTANTS
import USER from "../constants/userConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.GET_PROFILE_REQUEST:
      return { loading: true };
    case USER.GET_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER.GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER.PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER.PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER.PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

      case USER.GET_CART_REQUEST:
        return { loading: true };
      case USER.GET_CART_SUCCESS:
        return { loading: false, cart: true };
      case USER.GET_CART_FAIL:
        return { loading: false, error: action.payload };

        case USER.CART_UPDATE_REQUEST:
          return { loading: true };
        case USER.CART_UPDATE_SUCCESS:
          return { loading: false, successCartUpdate: true };
        case USER.CART_UPDATE_FAIL:
          return { loading: false, error: action.payload };

          case USER.CART_DELETE_REQUEST:
            return { loading: true };
          case USER.CART_DELETE_SUCCESS:
            return { loading: false, successCartDelete: true };
          case USER.CART_DELETE_FAIL:
            return { loading: false, error: action.payload };
  

    default:
      return state;
  }
};
