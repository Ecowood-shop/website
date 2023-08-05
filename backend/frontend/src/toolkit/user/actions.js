// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useAxios, useCustomAxios } from "../../utils/hooks/useAxios";

// API request for logout
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("shipping");
      await useCustomAxios.post("/api/users/logout/", {
        nothing: "nothing",
      });
    } catch (err) {
      // There shouldn't be any errors
    }
  }
);

// API request for login
export const login = createAsyncThunk(
  "user/login",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await useAxios.post("/api/users/login/", formData);
      dispatch(getUser());
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting user profile using cookie
export const getUser = createAsyncThunk(
  "profile/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await useCustomAxios.get("/api/users/profile");
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);
