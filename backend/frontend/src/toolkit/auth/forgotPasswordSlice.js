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

// API request for sending reset password link
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (props, { rejectWithValue }) => {
    const { values, language } = props;
    try {
      const { data } = await useAxios.post(
        `/api/users/forgot/password/?language=${language.toUpperCase()}`,
        values
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export forgot password slice
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Forgot password
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
