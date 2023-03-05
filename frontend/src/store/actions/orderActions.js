// CONSTANTS
import ORDER from "../constants/orderConstants";

//AXIOS
import { useCustomAxios, useAxios } from "../../hooks/useAxios";

export const createOrder = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER.CREATE_REQUEST,
    });

    const { data } = await useCustomAxios.post("/api/orders/add/", {
      ...formData,
      shippingPrice: 0,
    });

    dispatch({
      type: ORDER.CREATE_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("shipping");
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER.CREATE_FAIL,
      payload: error,
    });
  }
};

export const getOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER.GET_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/orders/${id}`);

    dispatch({
      type: ORDER.GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER.GET_FAIL,
      payload: error?.message,
    });
  }
};
