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
    const { id, formData, language } = args;
    try {
      const { data } = await useCustomAxios.post(
        `/api/products/cartload/${id}/?language=${language.toUpperCase()}`,
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
    const { id, qty, language } = args;
    try {
      await useCustomAxios.put(
        `/api/products/updatecart/${id}/?language=${language.toUpperCase()}`,
        { qty: qty }
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for deleting cart product
export const deleteCart = createAsyncThunk(
  "cart/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.delete(
        `/api/products/removecart/${id}?language=${language.toUpperCase()}`
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);
