// Import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// Import redux toolkit
import { createAsyncThunk } from "@reduxjs/toolkit";

// Import  axios
import { useAxios, useCustomAxios } from "../../utils/hooks/useAxios";

// API request for getting products
export const getProducts = createAsyncThunk(
  "products/get",
  async (args, { rejectWithValue }) => {
    const { language = "geo", word, category, orderby, page } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/?language=${language.toUpperCase()}&keyword=${word}&page=${page}&order=${orderby}&category=${category}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting public product
export const getProduct = createAsyncThunk(
  "product/get",
  async (args, { rejectWithValue }) => {
    const { id, language = "geo" } = args;
    try {
      const { data } = await useAxios.get(
        `/api/products/${id}/?language=${language.toUpperCase()}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for getting product for admin
export const getProductAdmin = createAsyncThunk(
  "admin/getProduct",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      const { data } = await useAxios.get(`/api/products/${id}/admin`);
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for creating product
export const createProduct = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue }) => {
    try {
      await useCustomAxios.post("/api/products/create/", formData);
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for updating product
export const updateProduct = createAsyncThunk(
  "product/update",
  async (args, { rejectWithValue }) => {
    const { id, formData } = args;
    try {
      await useCustomAxios.put(`/api/products/update/${id}/`, formData);
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// API request for deleting product
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (args, { rejectWithValue }) => {
    const { id } = args;
    try {
      const { data } = await useCustomAxios.delete(
        `/api/products/delete/${id}/`
      );
      return data;
    } catch (err) {
      return rejectWithValue(Object.values(err.response.data)[0]);
    }
  }
);

// Initial state
const initialState = {
  product: null,
  products: [],
  success: false,
  isLoading: false,
  error: null,
};

// Export product slice for users
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reset state
    reset: (state) => {
      state.product = null;
      state.products = [];
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Getting products
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get product for user
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Get product for admin
    builder.addCase(getProductAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Create product
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Deletting product
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

// Export additional action for resetting state
export const { reset } = productSlice.actions;
export default productSlice.reducer;
