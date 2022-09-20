// REACT
import { useNavigate } from "react-router-dom";
import axios from "axios";

// REDUX
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/systemActions";
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
    if (error.response.status == 401) {
      store.dispatch(logout());
    }
  }
);
