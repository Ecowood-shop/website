// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import  axios
import { useAxios, useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting products
export const getProducts = createAsyncThunk(
  "products/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo", word, category, orderby, page } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/?language=${language.toUpperCase()}&keyword=${word}&page=${page}&order=${orderby}&category=${category}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting public product
export const getProduct = createAsyncThunk(
  "product/get",
  async (args, { rejectWithValue }) => {
    const { id, language = "geo" } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting product for admin
export const getProductAdmin = createAsyncThunk(
  "admin/getProduct",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/${id}/admin?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for creating product
export const createProduct = createAsyncThunk(
  "product/create",
  async (args, { rejectWithValue }) => {
    const { values, language } = args;
    try {
      await useCustomAxios.post(
        `/api/products/create/?language=${language.toUpperCase()}`,
        values
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for updating product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (args, { rejectWithValue }) => {
    const { id, formData, language } = args;
    try {
      await useCustomAxios.put(
        `/api/products/update/${id}/?language=${language.toUpperCase()}`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for deleting product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      const { data } = await useCustomAxios.delete(
        `/api/products/delete/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);
