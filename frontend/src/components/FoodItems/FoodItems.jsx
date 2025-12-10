// FoodItems.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, syncCart } from "../Slice/CartSlice";
import { useNavigate } from "react-router-dom";

const FoodItems = ({ _id, name, price, description, image, user }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user?.id) return navigate("/login");

    const item = { _id, name, price, description, image };

    let updated = [...cart];
    const exist = updated.find((i) => i._id === _id);

    if (exist) exist.quantity++;
    else updated.push({ ...item, quantity: 1 });

    dispatch(setItems(updated));
    dispatch(syncCart({ userId: user.id, items: updated }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button
          onClick={handleAdd}
          className="absolute bottom-3 right-3 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
        >
          🛒
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-green-600 font-semibold text-lg">${price}</span>

          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItems;
