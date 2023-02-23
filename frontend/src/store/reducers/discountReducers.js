// constants
import DISCOUNT from "../constants/discountConstants";

export const discountReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT.GET_DISCOUNT_REQUEST:
      return { loading: true};
    case DISCOUNT.GET_DISCOUNT_SUCCESS:
      return { loading: false, discounts: action.payload };
    case DISCOUNT.GET_DISCOUNT_FAIL:
      return { loading: false, error: action.payload };

    case DISCOUNT.CREATE_DISCOUNT_REQUEST:
      return { loading: true, success: false };
    case DISCOUNT.CREATE_DISCOUNT_SUCCESS:
      return { loading: false,success: action.payload };
    case DISCOUNT.CREATE_DISCOUNT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
