import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrders, updateOrderStatusBackend } from "../../components/Slice/placeOrder";

const OrderPage = ({ user }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) dispatch(fetchOrders(user.id));
  }, [user, dispatch]);

  const markDelivered = (id) => {
    dispatch(updateOrderStatusBackend({ orderId: id, status: "Delivered" }));
  };

  if (!user) return <p className="text-center mt-12 text-red-500">Please login to view orders.</p>;

  return (
    <div className="min-h-screen pt-24 p-6 bg-gray-100">
  {/* pt-24 = padding-top to offset the navbar height */}


    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between mb-6">
        <button onClick={() => navigate("/")} className="text-blue-600">← Home</button>
        <button onClick={() => navigate("/cart")} className="text-green-600">← Cart</button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      {orders.length === 0 ? <p className="text-center text-gray-500">No orders yet.</p> : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              <div className="mt-3 border-t pt-3">
                {order.items.map(item => (
                  <div key={item._id} className="flex justify-between mb-2">
                    <p>{item.name} x {item.quantity}</p>
                    <p>${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-bold text-right">Total: ${order.totalAmount}</p>
              {order.status !== "Delivered" && (
                <button onClick={() => markDelivered(order._id)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-xl">Mark Delivered</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default OrderPage;
