// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useAxios, useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting categories
export const getCategories = createAsyncThunk(
  "categories/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo" } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/categories/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting category for admin
export const getCategory = createAsyncThunk(
  "category/get",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/categories/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for creating category
export const createCategory = createAsyncThunk(
  "category/create",
  async (args, { rejectWithValue }) => {
    const { values, language } = args;
    try {
      await useCustomAxios.post(
        `/api/products/category/create?language=${language.toUpperCase()}`,
        values
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for updating category
export const updateCategory = createAsyncThunk(
  "category/update",
  async (args, { rejectWithValue }) => {
    const { id, formData, language } = args;
    try {
      await useAxios.put(
        `/api/products/category/update/${id}/?language=${language.toUpperCase()}`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting categories
export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.delete(
        `/api/products/category/delete/${id}?language=${language.toUpperCase()}`
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);
