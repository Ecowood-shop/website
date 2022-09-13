// CONSTANTS
import SYSTEM from "../constants/systemConstants";

//AXIOS
import { useAxios, useCustomAxios } from "../../hooks/useAxios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.LOGIN_REQUEST,
    });

    const { data } = await useAxios.post("/api/users/login/", {
      email: email,
      password: password,
    });
    

    dispatch({
      type: SYSTEM.LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {

    dispatch({
      type: SYSTEM.LOGIN_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch({ type: SYSTEM.LOGOUT });
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
        type: SYSTEM.REGISTER_REQUEST,
      });

      const { data } = await useAxios.post("/api/users/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
      });

      dispatch({
        type: SYSTEM.REGISTER_SUCCESS,
        payload: data,
      });
      dispatch(login(email, password));
    } catch (error) {
      dispatch({
        type: SYSTEM.REGISTER_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0][0]
          : error.response,
      });
    }
  };

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.GET_CATEGORIES_REQUEST,
    });

    const { data } = await useAxios.get("/api/products/categories/");

    dispatch({
      type: SYSTEM.GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM.GET_CATEGORIES_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0][0]
        : error.response,
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.GET_PRODUCTS_REQUEST,
    });

    const { data } = await useAxios.get("/api/products/latest/");

    dispatch({
      type: SYSTEM.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SYSTEM.GET_PRODUCTS_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM.GET_PRODUCT_REQUEST,
    });

    const { data } = await useAxios.get(`/api/products/${id}`);

    dispatch({
      type: SYSTEM.GET_PRODUCT_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: SYSTEM.GET_PRODUCT_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0]
        : error.response,
    });
  }
};
