// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting shipping prices
export const getShippingPrices = createAsyncThunk(
  "shippingPrices/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo" } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/orders/prices/?language=${language}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting shipping price by id
export const getShippingPrice = createAsyncThunk(
  "shippingPrice/get",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      const { data } = await useCustomAxios.get(`/api/orders/prices/${id}/`);
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for creating shipping price
export const createShippingPrice = createAsyncThunk(
  "shippingPrice/create",
  async (args, { rejectWithValue }) => {
    const { formData } = args;
    try {
      await useCustomAxios.post("/api/orders/shippingPrice/create/", formData);
    } catch (err) {
      return rejectWithValue(
        err?.response
          ? Object.values(err?.response?.data)[0]
          : Object.values(err?.data)[0]
      );
    }
  }
);

// API request for updating shipping price
export const updateShippingPrice = createAsyncThunk(
  "shippingPrice/update",
  async (args, { rejectWithValue }) => {
    const { id, formData } = args;
    try {
      await useCustomAxios.put(
        `/api/orders/shippingPrice/update/${id}/`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for deleting shipping price
export const deleteShippingPrice = createAsyncThunk(
  "shippingPrice/delete",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      await useCustomAxios.delete(`/api/orders/shippingPrice/delete/${id}/`);
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);
