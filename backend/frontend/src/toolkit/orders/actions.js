// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting user orders for admin
export const getOrders = createAsyncThunk(
  "orders/get",
  async (args, { rejectWithValue }) => {
    const { page, word, status, id, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/orders/?keyword=${word}&page=${page}&delivered=${status}&ordID=${id}&language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for getting order of user
export const getOrder = createAsyncThunk(
  "order/get",
  async (args, { rejectWithValue }) => {
    const { id, language = "geo" } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/orders/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for creating order
export const createOrder = createAsyncThunk(
  "order/create",
  async (args, { rejectWithValue }) => {
    const { formData, language = "geo" } = args;
    try {
      const { data } = await useCustomAxios.post(
        `/api/orders/add/?language=${language.toUpperCase()}`,
        {
          ...formData,
          shippingPrice: 0,
        }
      );
      localStorage.removeItem("shipping");
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for setting delivered status of the order to true
export const delivered = createAsyncThunk(
  "order/delivered",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.put(
        `/api/orders/${id}/deliver/?language=${language.toUpperCase()}`,
        {}
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for deleting order
export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.delete(
        `/api/orders/${id}/delete/?language=${language.toUpperCase()}`
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);
