import { configureStore } from "@reduxjs/toolkit";
import StoreReducer from "./components/Slice/StoreSlice";
import CartReducer from "./components/Slice/CartSlice";
import OrderReducer from "./components/Slice/placeOrder";

const store = configureStore({
  reducer: {
    store: StoreReducer,
    cart: CartReducer,
    orders: OrderReducer
  },
});

export default store;