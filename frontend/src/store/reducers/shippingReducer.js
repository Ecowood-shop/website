// CONSTANTS
import SHIPPING from "../constants/shippingConstants";

export const shippingReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIPPING.GET_SHIPPING_REQUEST:
      return { shipping: action.payload };

    case SHIPPING.SAVE_SHIPPING_METHOD:
      return { ...state, shipping: action.payload };

    case SHIPPING.SAVE_SHIPPING_DETAILS:
      return { ...state, shipping: action.payload };

    case SHIPPING.SAVE_SHIPPING_PAYMENT_METHOD:
      return { ...state, shipping: action.payload };

    case SHIPPING.CLEAR_SHIPPING_ITEMS:
      return {
        shipping: {},
      };

    // PRICES
    case SHIPPING.GET_PRICES_REQUEST:
      return { ...state, loading: true };

    case SHIPPING.GET_PRICES_SUCCESS:
      return { ...state, loading: false, prices: action.payload };

    case SHIPPING.GET_PRICES_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};
