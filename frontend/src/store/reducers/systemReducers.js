// CONSTANTS
import {
  SYSTEM_LOGIN_FAIL,
  SYSTEM_LOGIN_REQUEST,
  SYSTEM_LOGIN_SUCCESS,
  SYSTEM_LOGOUT,
  SYSTEM_REGISTER_FAIL,
  SYSTEM_REGISTER_REQUEST,
  SYSTEM_REGISTER_SUCCESS,
} from "../constants/systemConstants";

export const systemUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM_LOGIN_REQUEST:
      return { loading: true };

    case SYSTEM_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };

    case SYSTEM_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case SYSTEM_LOGOUT:
      return {};

    case SYSTEM_REGISTER_REQUEST:
      return { loading: true };

    case SYSTEM_REGISTER_SUCCESS:
      return { loading: false, user: action.payload };

    case SYSTEM_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
