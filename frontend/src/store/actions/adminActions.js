// CONSTANTS
import ADMIN from "../constants/adminConstants";

// AXIOS
import { useCustomAxios } from "../../hooks/useAxios";

// PRODUCTS

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

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.CREATE_PRODUCT_REQUEST,
    });
    const { data } = await useCustomAxios.post("/api/products/create/", {
      ...formData,
    });
    dispatch({
      type: ADMIN.CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.CREATE_PRODUCT_FAIL,
      payload: error?.message,
    });
  }
};

export const updateProduct = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.UPDATE_PRODUCT_REQUEST,
    });
    const { data } = await useCustomAxios.put(`/api/products/update/${id}/`, {
      ...formData,
    });
    dispatch({
      type: ADMIN.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADMIN.UPDATE_PRODUCT_FAIL,
      payload: error?.message,
    });
  }
};

// USERS

export const getUsers = (page, word, status) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_USERS_REQUEST,
    });
    const { data } = await useCustomAxios.get(
      `/api/users/?keyword=${word}&page=${page}&is_staff=${status}`
    );

    dispatch({
      type: ADMIN.GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_USERS_FAIL,
      payload: error?.message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_USER_REQUEST,
    });
    const { data } = await useCustomAxios.get(`/api/users/${id}`);

    dispatch({
      type: ADMIN.GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_USER_FAIL,
      payload: error?.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_USER_REQUEST,
    });
    const { data } = await useCustomAxios.delete(`/api/users/delete/${id}/`);

    dispatch({
      type: ADMIN.DELETE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_USER_FAIL,
      payload: error?.message,
    });
  }
};

export const updateUser =
  ({ id, firstName, lastName, email, phone, status }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ADMIN.UPDATE_USER_REQUEST,
      });
      const { data } = await useCustomAxios.put(`/api/users/update/${id}/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        is_staff: status,
      });

      dispatch({
        type: ADMIN.UPDATE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN.UPDATE_USER_FAIL,
        payload: error?.message,
      });
    }
  };

// VARIANTS

export const getVariants = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_VARIANTS_REQUEST,
    });

    const { data } = await useCustomAxios.get(`/api/products/variants/${id}`);

    dispatch({
      type: ADMIN.GET_VARIANTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_VARIANTS_FAIL,
      payload: error?.message,
    });
  }
};

export const createVariant = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.CREATE_VARIANT_REQUEST,
    });
    console.log(formData);
    const { data } = await useCustomAxios.post(
      "/api/products/variants/create",
      {
        ...formData,
      }
    );

    dispatch({
      type: ADMIN.CREATE_VARIANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.CREATE_VARIANT_FAIL,
      payload: error?.message,
    });
  }
};

export const deleteVariant = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_VARIANT_REQUEST,
    });

    const { data } = await useCustomAxios.delete(
      `/api/products/variants/delete/${id}`
    );

    dispatch({
      type: ADMIN.DELETE_VARIANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_VARIANT_FAIL,
      payload: error?.message,
    });
  }
};

export const updateVariant = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.UPDATE_VARIANT_REQUEST,
    });

    const { data } = await useCustomAxios.put(
      `/api/products/variants/update/${formData.id}/`,
      {
        quantity: formData.quantity,
        color: formData.color,
        title: formData.title,
      }
    );

    dispatch({
      type: ADMIN.UPDATE_VARIANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.UPDATE_VARIANT_FAIL,
      payload: error?.message,
    });
  }
};

// COLORS

export const getColors = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_COLORS_REQUEST,
    });

    const { data } = await useCustomAxios.get("/api/products/colors/");

    dispatch({
      type: ADMIN.GET_COLORS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_COLORS_FAIL,
      payload: error?.message,
    });
  }
};
