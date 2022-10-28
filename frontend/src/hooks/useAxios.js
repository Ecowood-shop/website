// REACT
import axios from "axios";

// REDUX

import { logout } from "../store/actions/userActions";
import store from "../store/store";

export const useAxios = axios.create({
  headers: { "Content-Type": "application/json" },
});

export const useCustomAxios = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

useCustomAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error.response.status == 401)
    if (error.response.status == 401) {
      store.dispatch(logout());
    }
    else{
      return Promise.reject(error.response);
    }
  }
);


export const useCustomFileAxios=axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

useCustomFileAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status == 401) {
      store.dispatch(logout());
    }
  }
);
