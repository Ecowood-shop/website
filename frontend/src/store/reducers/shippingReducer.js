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
      return { ...state, loading: true, success: false };

    case SHIPPING.GET_PRICES_SUCCESS:
      return { ...state, loading: false, prices: action.payload };

    case SHIPPING.GET_PRICES_FAIL:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const cityReducer = (state = {}, action) => {
  switch (action.type) {
    //                            CITIES
    // CREATE
    case SHIPPING.CREATE_CITY_REQUEST:
      return { ...state, loading: true };

    case SHIPPING.CREATE_CITY_SUCCESS:
      return { ...state, loading: false, success: true };

    case SHIPPING.CREATE_CITY_FAIL:
      return { ...state, loading: false, error: action.payload };

    // GET BY ID
    case SHIPPING.GET_CITY_BY_ID_REQUEST:
      return { ...state, loading: true };

    case SHIPPING.GET_CITY_BY_ID_SUCCESS:
      return { ...state, loading: false, city: action.payload };

    case SHIPPING.GET_CITY_BY_ID_FAIL:
      return { ...state, loading: false, error: action.payload };

    // UPDATE
    case SHIPPING.UPDATE_CITY_REQUEST:
      return { ...state, loading: true };

    case SHIPPING.UPDATE_CITY_SUCCESS:
      return { ...state, loading: false, success: true };

    case SHIPPING.UPDATE_CITY_FAIL:
      return { ...state, loading: false, error: action.payload };

    // DELETE
    case SHIPPING.DELETE_CITY_REQUEST:
      return { ...state, loading: true };

    case SHIPPING.DELETE_CITY_SUCCESS:
      return { ...state, loading: false, success: true };

    case SHIPPING.DELETE_CITY_FAIL:
      return { ...state, loading: false, error: action.payload };

    case SHIPPING.GET_CITY_RESET:
      return {};
    default:
      return state;
  }
};
