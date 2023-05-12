// CONSTANTS
import ADMIN from "../constants/adminConstants";
// AXIOS
import {
  useAxios,
  useCustomAxios,
  useCustomFileAxios,
} from "../../hooks/useAxios";

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_PRODUCT_REQUEST,
    });

    const { data } = await useAxios.get(`/api/products/${id}/admin`);

    dispatch({
      type: ADMIN.GET_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_PRODUCT_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};
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
      payload: error?.data[0],
    });
  }
};

//    Category
// get category by id for admin (USED: update category page)
export const getCategoryById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_CATEGORY_BY_ID_REQUEST,
    });

    const { data } = await useAxios.get(`/api/products/categories/${id}/`);

    dispatch({
      type: ADMIN.GET_CATEGORY_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_CATEGORY_BY_ID_FAILURE,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};

// update category with id  for admin (USED: update category page)
export const updateCategory = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.UPDATE_CATEGORY_REQUEST,
    });

    const { data } = await useAxios.put(
      `/api/products/category/update/${id}/`,
      {
        ...formData,
      }
    );

    dispatch({
      type: ADMIN.UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.UPDATE_CATEGORY_FAILURE,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};
export const createCategory = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({
      type: ADMIN.CREATE_CATEGORY_REQUEST,
    });
    const { data } = await useCustomAxios.post(
      "/api/products/category/create",
      {
        ...formData,
      }
    );
    dispatch({
      type: ADMIN.CREATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.CREATE_CATEGORY_FAIL,
      payload: error?.data[0],
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_CATEGORY_REQUEST,
    });
    const { data } = await useCustomAxios.delete(
      `/api/products/category/delete/${id}`
    );
    dispatch({
      type: ADMIN.DELETE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_CATEGORY_FAIL,
      payload: error?.data[0],
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
      payload: error?.message ? error?.message : error?.data[0],
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

//   IMAGES

export const getImages = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_IMAGES_REQUEST,
    });

    const { data } = await useCustomAxios.get(`/api/products/image/${id}/`);

    dispatch({
      type: ADMIN.GET_IMAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_IMAGES_FAIL,
      payload: error?.message,
    });
  }
};

export const createImage = (id, image, type) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.CREATE_IMAGE_REQUEST,
    });
    const formData = new FormData();
    formData.append("picture", image);
    formData.append("product_id", id);
    formData.append("ord", type);
    const { data } = await useCustomFileAxios.post(
      "/api/products/upload/",
      formData
    );

    dispatch({
      type: ADMIN.CREATE_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.CREATE_IMAGE_FAIL,
      payload: error?.message,
    });
  }
};

export const deleteImage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_IMAGE_REQUEST,
    });
    const { data } = await useCustomAxios.delete(
      `/api/products/image/delete/${id}/`
    );

    dispatch({
      type: ADMIN.DELETE_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_IMAGE_FAIL,
      payload: error?.message,
    });
  }
};

//   ORDERS

export const getOrders = (page, word, status, id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.GET_ORDER_LIST_REQUEST,
    });

    const { data } = await useCustomAxios.get(
      `/api/orders/?keyword=${word}&page=${page}&delivered=${status}&ordID=${id}`
    );

    dispatch({
      type: ADMIN.GET_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.GET_ORDER_LIST_FAIL,
      payload: error?.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.DELETE_ORDER_REQUEST,
    });
    const { data } = await useCustomAxios.delete(`/api/orders/${id}/delete/`);

    dispatch({
      type: ADMIN.DELETE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.DELETE_ORDER_FAIL,
      payload: error?.message,
    });
  }
};

export const orderDelivered = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN.ORDER_DELIVERED_REQUEST,
    });

    const { data } = await useCustomAxios.put(`/api/orders/${id}/deliver/`, {});

    dispatch({
      type: ADMIN.ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN.ORDER_DELIVERED_FAIL,
      payload: error?.message,
    });
  }
};
