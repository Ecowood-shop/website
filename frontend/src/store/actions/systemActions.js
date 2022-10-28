// CONSTANTS
import SYSTEM from "../constants/systemConstants";
//AXIOS
import { useAxios} from "../../hooks/useAxios";


export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.GET_CATEGORIES_REQUEST,
    });

    const { data } = await useAxios.get("/api/products/categories/");

    dispatch({
      type: SYSTEM.GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM.GET_CATEGORIES_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0][0]
        : error.response,
    });
  }
};

export const getLatestProducts =
  () => async (dispatch) => {
    try {
      dispatch({
        type: SYSTEM.GET_LATEST_PRODUCTS_REQUEST,
      });

      const { data } = await useAxios.get("/api/products/latest/");

      dispatch({
        type: SYSTEM.GET_LATEST_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SYSTEM.GET_LATEST_PRODUCTS_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0]
          : error.response,
      });
    }
  };

  export const getSimilarProducts =
  (category) => async (dispatch) => {
    try {
      dispatch({
        type: SYSTEM.GET_SIMILAR_PRODUCTS_REQUEST,
      });

      const { data } = await useAxios.get(`/api/products/latest/${category}`);

      dispatch({
        type: SYSTEM.GET_SIMILAR_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SYSTEM.GET_SIMILAR_PRODUCTS_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0]
          : error.response,
      });
    }
  };
  
export const getProducts =
  (word, category, orderby, page) => async (dispatch) => {
    try {
      dispatch({
        type: SYSTEM.GET_PRODUCTS_REQUEST,
      });

      const { data } = await useAxios.get(`/api/products/?keyword=${word}&page=${page}&order=${orderby}&category=${category}`
      );

      dispatch({
        type: SYSTEM.GET_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SYSTEM.GET_PRODUCTS_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0]
          : error.response,
      });
    }
  };

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.GET_PRODUCT_REQUEST,
    });

    const { data } = await useAxios.get(`/api/products/${id}`);

    dispatch({
      type: SYSTEM.GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM.GET_PRODUCT_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};


export const savePaymentMethod = (data) => (dispatch, getState) => {
  dispatch({
    type: SYSTEM.SAVE_SHIPPING_PAYMENT_METHOD,
    payload: data,
  });
  console.log(getState().shipping)
  localStorage.setItem("shipping", JSON.stringify(data));
};

export const saveShippingMethod = (data) => (dispatch) => {
  dispatch({
    type: SYSTEM.SAVE_SHIPPING_METHOD,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};

export const saveShippingDetails = (data) => (dispatch) => {
  dispatch({
    type: SYSTEM.SAVE_SHIPPING_DETAILS,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};
