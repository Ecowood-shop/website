// CONSTANTS
import {
  SYSTEM_LOGIN_FAIL,
  SYSTEM_LOGIN_REQUEST,
  SYSTEM_LOGIN_SUCCESS,
  SYSTEM_LOGOUT,
  SYSTEM_REGISTER_FAIL,
  SYSTEM_REGISTER_REQUEST,
  SYSTEM_REGISTER_SUCCESS,
  
  SYSTEM_GET_CATEGORIES_FAIL,
  SYSTEM_GET_CATEGORIES_SUCCESS,
  SYSTEM_GET_CATEGORIES_REQUEST
} from "../constants/systemConstants";
import { useAxios, useCustomAxios } from "../../hooks/useAxios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM_LOGIN_REQUEST,
    });

    const { data } = await useAxios.post("/api/users/login/", {
      email: email,
      password: password,
    });

    dispatch({
      type: SYSTEM_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SYSTEM_LOGIN_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0][0]
        : error.response,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch({ type: SYSTEM_LOGOUT });
    const { data } = await useCustomAxios.post("/api/users/logout/", {
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
        type: SYSTEM_REGISTER_REQUEST,
      });

      const { data } = await useAxios.post("/api/users/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password: password,
      });

      dispatch({
        type: SYSTEM_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch(login(email, password));
    } catch (error) {
      dispatch({
        type: SYSTEM_REGISTER_FAIL,
        payload: error.response?.data
          ? Object.values(error.response?.data)[0][0]
          : error.response,
      });
    }
  };


  
export const getCategories = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: SYSTEM_GET_CATEGORIES_REQUEST,
    });

    const { data } = await useAxios.get("/api/products/categories/");

    dispatch({
      type: SYSTEM_GET_CATEGORIES_SUCCESS,
      payload: data,
    });
 
  } catch (error) {
    dispatch({
      type: SYSTEM_GET_CATEGORIES_FAIL,
      payload: error.response?.data
        ? Object.values(error.response?.data)[0][0]
        : error.response,
    });
  }
};