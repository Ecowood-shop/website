// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import axios
import { useAxios } from "../../utils/hooks/useAxios";

// Initial state
const initialState = {
  success: false,
  isLoading: false,
  error: null,
};

// API request for register
export const register = createAsyncThunk(
  "auth/register",
  async (args, { rejectWithValue }) => {
    const { values, language } = args;
    try {
      const { data } = await useAxios.post(
        `/api/users/register/?language=${language.toUpperCase()}`,
        values
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export register slice
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.success = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = registerSlice.actions;
export default registerSlice.reducer;
