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

export const createCity = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPING.CREATE_CITY_REQUEST,
    });

    const { data } = await useCustomAxios.post(
      "/api/orders/shippingPrice/create/",
      formData
    );

    dispatch({
      type: SHIPPING.CREATE_CITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING.CREATE_CITY_FAIL,
      payload: error?.data["detail "],
    });
  }
};


export const updateCity = (formData,id) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPING.UPDATE_CITY_REQUEST,
    });

    const { data } = await useCustomAxios.put(
      `/api/orders/shippingPrice/update/${id}/`,
      formData
    );

    dispatch({
      type: SHIPPING.UPDATE_CITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING.UPDATE_CITY_FAIL,
      payload: error?.data["detail "],
    });
  }
};


export const deleteCity = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SHIPPING.DELETE_CITY_REQUEST,
    });

    const { data } = await useCustomAxios.delete(
      `/api/orders/shippingPrice/delete/${id}/`
    );

    dispatch({
      type: SHIPPING.DELETE_CITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING.DELETE_CITY_FAIL,
      payload: error?.data["detail "],
    });
  }
};
