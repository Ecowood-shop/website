// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// Initial state
const initialState = {
  colors: [],
  isLoading: false,
  error: null,
};

// API request for getting colors
export const getColors = createAsyncThunk(
  "colors/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await useCustomAxios.get("/api/products/colors/");
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export color slice
export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get colors
    builder.addCase(getColors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.colors = action.payload;
    });
    builder.addCase(getColors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default colorSlice.reducer;
