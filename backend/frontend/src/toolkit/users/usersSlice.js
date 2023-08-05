// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import { getUser, getUsers, updateUser, deleteUser } from "./actions";

// Initial state
const initialState = {
  user: null,
  users: [],
  success: false,
  isLoading: false,
  error: null,
};

// Export users slice
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.user = null;
      state.users = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get user
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get users
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update user
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

    // Delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
