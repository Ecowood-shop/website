// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting users for admin
export const getUsers = createAsyncThunk(
  "users/get",
  async (args, { rejectWithValue }) => {
    const { page, word, status, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/users/?keyword=${word}&page=${page}&is_staff=${status}&language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting user by id
export const getUser = createAsyncThunk(
  "user/get",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/users/${id}?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for updating user info
export const updateUser = createAsyncThunk(
  "user/update",
  async (args, { rejectWithValue }) => {
    const { id, formData, language } = args;
    try {
      await useCustomAxios.put(
        `/api/users/update/${id}/?language=${language.toUpperCase()}`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for deleting user
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.delete(
        `/api/users/delete/${id}/?language=${language.toUpperCase()}`
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);
