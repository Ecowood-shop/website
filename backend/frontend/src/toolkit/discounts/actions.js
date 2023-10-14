// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting discounts
export const getDiscounts = createAsyncThunk(
  "discounts/get",
  async (args, { rejectWithValue }) => {
    const { page, word, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/products/specific/discounts/?keyword=${word}&page=${page}&language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for getting discount by id
export const getDiscount = createAsyncThunk(
  "discount/get",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      const { data } = await useCustomAxios.get(
        `/api/products/specific/discounts/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for creating discount
export const createDiscount = createAsyncThunk(
  "discount/create",
  async (args, { rejectWithValue }) => {
    const { formData, language } = args;

    try {
      await useCustomAxios.post(
        `/api/products/specific/discount/create/?language=${language.toUpperCase()}`,
        {
          ...formData,
        }
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for updating discount
export const updateDiscount = createAsyncThunk(
  "discount/update",
  async (args, { rejectWithValue }) => {
    const { id, formData, language } = args;
    try {
      await useCustomAxios.put(
        `/api/products/specific/discount/update/${id}/?language=${language.toUpperCase()}`,
        formData
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// API request for deleting discount
export const deleteDiscount = createAsyncThunk(
  "discount/delete",
  async (args, { rejectWithValue }) => {
    const { id, language } = args;
    try {
      await useCustomAxios.delete(
        `/api/products/delete/specific/discount/${id}/?language=${language.toUpperCase()}`
      );
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);
