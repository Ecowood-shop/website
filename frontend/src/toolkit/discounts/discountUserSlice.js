// Import redux toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Import axios
import { useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting users for discount
export const getUsers = createAsyncThunk(
  "discount/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await useCustomAxios.get(`/api/users/getJustUsers`);
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Initial state
const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

// Export discount user slice
export const discountUserSlice = createSlice({
  name: "discountUsers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get discount users
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
  },
});

export default discountUserSlice.reducer;
