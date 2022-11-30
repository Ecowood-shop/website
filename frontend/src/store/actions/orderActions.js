// CONSTANTS
import ORDER from "../constants/orderConstants";

//AXIOS
import { useCustomAxios, useAxios } from "../../hooks/useAxios";

export const createOrder = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER.CREATE_REQUEST,
    });
    console.log(formData);
    const { data } = await useCustomAxios.post("/api/orders/add/", {
      ...formData,
      shippingPrice: 0,
    });
    console.log(data, "pas");
    dispatch({
      type: ORDER.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER.CREATE_FAIL,
      payload: error?.data[0],
    });
  }
};
