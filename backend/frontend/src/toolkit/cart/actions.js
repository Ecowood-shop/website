// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting cart
export const getCart = createAsyncThunk(
  "cart/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo" } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/products/cart/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for adding product to cart
export const addToCart = createAsyncThunk(
  "cart/add",
  async (args, { rejectWithValue }) => {
    const { id, formData } = args;
    try {
      const { data } = await useCustomAxios.post(
        `/api/products/cartload/${id}/`,
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for updating cart product
export const updateCart = createAsyncThunk(
  "cart/update",
  async (args, { rejectWithValue }) => {
    const { id, qty } = args;
    try {
      await useCustomAxios.put(`/api/products/updatecart/${id}/`, { qty: qty });
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for deleting cart product
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      await useCustomAxios.delete(`/api/products/removecart/${id}`);
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);
