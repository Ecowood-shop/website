// CONSTANTS
import ADMIN from "../constants/adminConstants";

// AXIOS
import { useAxios, useCustomAxios } from "../../hooks/useAxios";

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_PRODUCT_REQUEST,
    });
    const { data } = await useCustomAxios.delete(`/api/products/delete/${id}/`);

    dispatch({
      type: ADMIN.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_PRODUCT_FAIL,
      payload: error?.message,
    });
  }
};
