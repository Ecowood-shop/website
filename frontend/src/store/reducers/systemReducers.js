// CONSTANTS
import SYSTEM from "../constants/systemConstants";

export const systemUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.LOGIN_REQUEST:
      return { loading: true };
    case SYSTEM.LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case SYSTEM.LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case SYSTEM.LOGOUT:
      return {};

    case SYSTEM.REGISTER_REQUEST:
      return { loading: true };
    case SYSTEM.REGISTER_SUCCESS:
      return { loading: false };
    case SYSTEM.REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const systemCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.GET_CATEGORIES_REQUEST:
      return { loading: true };
    case SYSTEM.GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case SYSTEM.GET_CATEGORIES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const systemProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.GET_PRODUCTS_REQUEST:
      return { loading: true };
    case SYSTEM.GET_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case SYSTEM.GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const systemLatestProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.GET_LATEST_PRODUCTS_REQUEST:
      return { loading: true };
    case SYSTEM.GET_LATEST_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case SYSTEM.GET_LATEST_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const systemSimilarProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.GET_SIMILAR_PRODUCTS_REQUEST:
      return { loading: true };
    case SYSTEM.GET_SIMILAR_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case SYSTEM.GET_SIMILAR_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const systemProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SYSTEM.GET_PRODUCT_REQUEST:
      return { loading: true };
    case SYSTEM.GET_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case SYSTEM.GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case SYSTEM.GET_PRODUCT_RESET:
      return { loading: false, product: {} };

    default:
      return state;
  }
};
