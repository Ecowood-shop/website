import axios from "axios";

export const useAxios = axios.create({
  headers: { "Content-Type": "application/json" },
});

export const useCustomAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null
    }`,
  },
});
