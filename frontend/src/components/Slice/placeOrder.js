import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";
const API_URL = `${API}/orders`;

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data;
});

export const placeOrderBackend = createAsyncThunk(
  "orders/placeOrderBackend",
  async ({ userId, items, totalAmount }) => {
    const res = await axios.post(`${API_URL}/`, { userId, items, totalAmount });
    return res.data;
  }
);

export const updateOrderStatusBackend = createAsyncThunk(
  "orders/updateOrderStatusBackend",
  async ({ orderId, status }) => {
    const res = await axios.put(`${API_URL}/${orderId}`, { status });
    return res.data;
  }
);

const initialState = { orders: [] };

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(placeOrderBackend.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(updateOrderStatusBackend.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export const { setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
