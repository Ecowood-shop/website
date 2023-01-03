// CONSTANTS
import SHIPPING from "../constants/shippingConstants";

//AXIOS
import { useCustomAxios, useAxios } from "../../hooks/useAxios";


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: SHIPPING.SAVE_SHIPPING_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};

export const saveShippingMethod = (data) => (dispatch) => {
  dispatch({
    type: SHIPPING.SAVE_SHIPPING_METHOD,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};

export const saveShippingDetails = (data) => (dispatch) => {
  dispatch({
    type: SHIPPING.SAVE_SHIPPING_DETAILS,
    payload: data,
  });
  localStorage.setItem("shipping", JSON.stringify(data));
};


export const getShippingPrices = () => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPING.GET_PRICES_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/orders/prices/`);

    dispatch({
      type: SHIPPING.GET_PRICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING.GET_PRICES_FAIL,
      payload: error?.message,
    });
  }
};
