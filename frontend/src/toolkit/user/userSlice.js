// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import actions
import { login, getUser, logout } from "./actions";


// Initial state
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

// Export user profile slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get user profile
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

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
    });
  },
});

// Export additional action for resetting state
export const { reset } = userSlice.actions;
export default userSlice.reducer;
