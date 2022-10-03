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

    default:
      return state;
  }
};
