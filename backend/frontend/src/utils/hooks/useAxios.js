// Import axios
import axios from "axios";

// Import logout
import { logout } from "../../toolkit/user/actions";

// Export store injection function,
// Store is injected in index.js
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Export axios without cookies
export const useAxios = axios.create({
  headers: { "Content-Type": "application/json" },
});

// Export custom axios with cookies
export const useCustomAxios = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// If unauthorized run logout
useCustomAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    } else {
      return Promise.reject(error.response);
    }
  }
);

// Export custom file axios for images
// cookies included
export const useCustomFileAxios = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// If unauthorized run logout
useCustomFileAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logout());
    }
  }
);
