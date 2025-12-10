import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import OrderPage from "./components/orders/Orders";
import Footer from "./components/Footer/Footer";
import { supabase } from "./supabaseClient";
import { fetchCart, clearCart } from "./components/Slice/CartSlice";

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const u = data.user || null;
      setUser(u);

      if (u) dispatch(fetchCart(u.id));
      else dispatch(clearCart());
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      const u = session?.user || null;
      setUser(u);

      if (u) dispatch(fetchCart(u.id));
      else dispatch(clearCart());
    });

    return () => listener?.subscription.unsubscribe();
  }, [dispatch]);

  return (
    <>
      <NavBar user={user} />
      <div className="mt-[80px]">
      <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/cart" element={<Cart user={user} />} />
          <Route path="/orders" element={<OrderPage user={user} />} />
      </Routes>
       </div>
      <Footer />
    </>
  );
};

export default App;
