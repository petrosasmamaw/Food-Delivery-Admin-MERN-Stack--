import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// --- FETCH FOODS FROM BACKEND ---
export const fetchFoods = createAsyncThunk(
  "store/fetchFoods",
  async () => {
    const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
    const res = await axios.get(`${API}/foods`);
    return res.data;
  }
);

const StoreSlice = createSlice({
  name: "store",
  initialState: {
    foods: [],
    loading: false,
    error: null
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFoods.fulfilled, (state, action) => {
        state.loading = false;
        state.foods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default StoreSlice.reducer;
