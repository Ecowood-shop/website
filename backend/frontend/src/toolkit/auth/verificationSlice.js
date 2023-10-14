// Import redux toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import axios
import { useAxios } from "../../utils/hooks/useAxios";

// Import get user
import { getUser } from "../user/actions";

// Initial state
const initialState = {
  success: false,
  isLoading: false,
  error: null,
};

// API request for  verification
export const verifyEmail = createAsyncThunk(
  "auth/resetPassword",
  async (args, { dispatch, rejectWithValue }) => {
    const { id, token, language } = args;
    try {
      await useAxios.post(
        `/api/users/verify/${id}/${token}/?language=${language.toUpperCase()}`,
        {
          id: id,
          token: token,
        }
      );
      dispatch(getUser());
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Export verification slice
export const verificationSlice = createSlice({
  name: "verification",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Verify email
    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = verificationSlice.actions;
export default verificationSlice.reducer;
