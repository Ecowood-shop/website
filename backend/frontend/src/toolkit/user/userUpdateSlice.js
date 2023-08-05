// Import redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import  axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// Import get user
import { getUser } from "./actions";

// Initial state
const initialState = {
  success: false,
  isLoading: false,
  error: null,
};

// API request for updating user profile
export const updateUser = createAsyncThunk(
  "profile/update",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await useCustomAxios.put("/api/users/profile/update/", formData);
      dispatch(getUser());
    } catch (err) {
      return rejectWithValue(Object.values(err.data)[0]);
    }
  }
);

// Export user update slice
export const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Update user profile
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
