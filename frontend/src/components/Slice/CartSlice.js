// src/components/Slice/CartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const API_URL = `${API}/cart`;

// GET CART
export const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data.items || [];
});

// SYNC CART
export const syncCart = createAsyncThunk(
  "cart/sync",
  async ({ userId, items }) => {
    const res = await axios.put(`${API_URL}/${userId}`, { items });
    return res.data.items;
  }
);

// CLEAR CART IN DB
export const clearCartBackend = createAsyncThunk(
  "cart/clearBackend",
  async (userId) => {
    await axios.delete(`${API_URL}/${userId}`);
    return [];
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },

  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCartBackend.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export const { setItems, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
