// axios
import { useCustomAxios } from "../../hooks/useAxios";
// discount
import DISCOUNT from "../constants/discountConstants";

export const getDiscounts = (page, word) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.GET_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.get(
      `/api/products/specific/discounts/?keyword=${word}&page=${page}`
    );

    dispatch({
      type: DISCOUNT.GET_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.GET_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};

export const getSpecificDiscount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.GET_SPECIFIC_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.get(
      `/api/products/specific/discounts/${id}/`
    );

    dispatch({
      type: DISCOUNT.GET_SPECIFIC_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.GET_SPECIFIC_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.GET_USERS_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/users/getJustUsers`);

    dispatch({
      type: DISCOUNT.GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.GET_USERS_FAIL,
      payload: error?.message,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.GET_PRODUCTS_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/products/getJustProducts`);

    dispatch({
      type: DISCOUNT.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.GET_PRODUCTS_FAIL,
      payload: error?.message,
    });
  }
};

export const createDiscount = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.post(
      `/api/products/specific/discount/create/`,
      {
        ...formData,
      }
    );

    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_FAIL,
      payload: error?.data[0],
    });
  }
};

export const updateDiscount = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.put(
      `/api/products/specific/discount/update/${id}/`,
      {
        ...formData,
      }
    );

    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.CREATE_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};

export const deleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT.DELETE_DISCOUNT_REQUEST,
    });
    const { data } = await useCustomAxios.delete(
      `/api/products/delete/specific/discount/${id}/`
    );

    dispatch({
      type: DISCOUNT.DELETE_DISCOUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT.DELETE_DISCOUNT_FAIL,
      payload: error?.message,
    });
  }
};
