// CONSTANTS
import USER from "../constants/userConstants";

//AXIOS
import { useCustomAxios, useAxios } from "../../hooks/useAxios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER.LOGIN_REQUEST,
    });

    const { data } = await useAxios.post("/api/users/login/", {
      email: email,
      password: password,
    });
    dispatch(getUser());
    dispatch({
      type: USER.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER.LOGIN_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: USER.LOGOUT });
    const {} = await useCustomAxios.post("/api/users/logout/", {
      nothing: "nothing",
    });
  } catch (error) {
    //    THERE SHOULD NOT BE ANY ERRORS
  }
};

export const register =
  (firstName, lastName, email, phone, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER.REGISTER_REQUEST,
      });

      const { data } = await useAxios.post("/api/users/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
      });

      dispatch({
        type: USER.REGISTER_SUCCESS,
        payload: data,
      });
      dispatch(login(email, password));
    } catch (error) {
      dispatch({
        type: USER.REGISTER_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0][0]
          : error.response,
      });
    }
  };

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
      payload: error?.data ? error.data[0] : error?.message
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
console.log(data)
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
    console.log("id", cartId);
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
