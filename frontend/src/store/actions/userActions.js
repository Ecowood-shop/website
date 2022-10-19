// CONSTANTS
import USER from "../constants/userConstants";

//AXIOS
import { useCustomAxios } from "../../hooks/useAxios";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER.GET_PROFILE_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/users/profile`);

    dispatch({
      type: USER.GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.GET_PROFILE_FAIL,
      payload: error?.message,
    });
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: USER.PROFILE_UPDATE_REQUEST,
    });

    const { data } = await useCustomAxios.put("/api/users/profile/update/", {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      password: formData.password,
    });

    dispatch({
      type: USER.PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.PROFILE_UPDATE_FAIL,
      payload: error?.message,
    });
  }
};

// CART

export const getCart = () => async (dispatch) => {
  try {
    dispatch({
      type: USER.GET_CART_REQUEST,
    });

    const { data } = await useCustomAxios.get("/api/products/cart/");

    dispatch({
      type: USER.GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.GET_CART_FAIL,
      payload: error?.message,
    });
  }
};

export const addToCart = (productId, variantID, qty) => async (dispatch) => {
  try {
    dispatch({
      type: USER.CART_ADD_REQUEST,
    });

    const { data } = await useCustomAxios.post(
      `/api/products/cartload/${productId}/`,
      {
        variantID: variantID,
        qty: qty,
      }
    );

    dispatch({
      type: USER.CART_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER.CART_ADD_FAIL,
      payload: error?.data[0],
    });
  }
};

export const deleteCart = (cartId) => async (dispatch) => {
  try {
    dispatch({
      type: USER.CART_DELETE_REQUEST,
    });
    console.log(cartId);
    const { data } = await useCustomAxios.delete(
      `/api/products/removecart/${cartId}`
    );

    dispatch({
      type: USER.CART_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.CART_DELETE_FAIL,
      payload: error?.message,
    });
  }
};

export const updateCart = (cartId, qty) => async (dispatch) => {
  try {
    dispatch({
      type: USER.CART_UPDATE_REQUEST,
    });
    console.log("id",cartId);
    const { data } = await useCustomAxios.put(
      `/api/products/updatecart/${cartId}/`,
      { qty: qty }
    );

    dispatch({
      type: USER.CART_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.CART_UPDATE_FAIL,
      payload: error?.message,
    });
  }
};
