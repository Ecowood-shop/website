// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import custom axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting variants of product for admin
export const getVariants = createAsyncThunk(
  "variants/get",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      const { data } = await useCustomAxios.get(`/api/products/variants/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for creating variant of product
export const createVariant = createAsyncThunk(
  "variant/create",
  async (args, { rejectWithValue }) => {
    const { formData } = args;
    try {
      await useCustomAxios.post("/api/products/variants/create", formData);
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for updating variant
export const updateVariant = createAsyncThunk(
  "variant/update",
  async (args, { rejectWithValue }) => {
    const { formData } = args;
    try {
      await useCustomAxios.put(
        `/api/products/variants/update/${formData.id}/`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for deleting variant
export const deleteVariant = createAsyncThunk(
  "variant/delete",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      await useCustomAxios.delete(`/api/products/variants/delete/${id}`);
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);
