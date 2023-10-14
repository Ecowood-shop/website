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

// API request for  resetting password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (args, { rejectWithValue }) => {
    const { id, token, formData, language } = args;
    try {
      const { data } = await useAxios.post(
        `/api/users/reset/password/${id}/${token}/?language=${language.toUpperCase()}`,
        formData
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export reset password slice
export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default resetPasswordSlice.reducer;
