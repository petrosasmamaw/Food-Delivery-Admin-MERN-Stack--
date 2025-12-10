// Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  setItems,
  syncCart,
  clearCart,
  clearCartBackend,
} from "../../components/Slice/CartSlice";

import { placeOrderBackend } from "../../components/Slice/placeOrder";

const Cart = ({ user }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const updateServer = (updatedItems) => {
    dispatch(setItems(updatedItems));
    dispatch(syncCart({ userId: user.id, items: updatedItems }));
  };

  const increase = (item) => {
    const updated = items.map((i) =>
      i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
    );
    updateServer(updated);
  };

  const decrease = (id) => {
    const updated = items
      .map((i) =>
        i._id === id ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0);
    updateServer(updated);
  };

  const remove = (id) => {
    const updated = items.filter((i) => i._id !== id);
    updateServer(updated);
  };

  const handleOrder = async () => {
    if (!user) return alert("Please login first");

    await dispatch(
      placeOrderBackend({ userId: user.id, items, totalAmount: totalPrice })
    );

    await dispatch(clearCartBackend(user.id));
    dispatch(clearCart());
  };

  return (
    <div className="max-w-5xl mx-auto p-6 pt-32">
      <div className="flex justify-between mb-6">
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded-xl">
          ← Home
        </Link>
        <Link
          to="/orders"
          className="px-4 py-2 bg-purple-500 text-white rounded-xl"
        >
          My Orders →
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-2xl shadow-md"
            >
              <img src={item.image} className="w-24 h-24 rounded-xl" />

              <div className="flex-1">
                <h3>{item.name}</h3>
                <p>${item.price}</p>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => decrease(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increase(item)}>+</button>
                </div>
              </div>

              <button
                onClick={() => remove(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 flex justify-end items-center gap-4">
          <span className="font-bold">Total: ${totalPrice.toFixed(2)}</span>
          <button
            onClick={handleOrder}
            className="bg-green-500 text-white px-6 py-2 rounded-2xl"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
