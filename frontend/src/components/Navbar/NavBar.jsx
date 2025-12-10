import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const NavBar = () => {
  const [active, setActive] = useState("header");
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const menuItems = [
    { id: "header", label: "Home" },
    { id: "explore-menu", label: "Menu" },
    { id: "app-download", label: "Mobile App" },
    { id: "footer", label: "Contact Us" },
  ];

  // Fetch Supabase session on mount
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));

    // Listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      menuItems.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= 120 && top + el.offsetHeight > 120) {
          setActive(item.id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-2">
            <img src={assets.logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-gray-800">Food Delivery</span>
          </div>

          <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
            {menuItems.map(item => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`cursor-pointer transition-colors hover:text-blue-500 ${active === item.id ? "border-b-2 border-blue-500" : ""}`}
              >
                {item.label}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <img src={assets.search_icon} alt="Search" className="w-6 h-6 cursor-pointer hover:text-blue-500 transition-colors" />
            <div className="relative">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="Basket" className="w-6 h-6 cursor-pointer" />
              </Link>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center"></span>
            </div>

            {!user ? (
              <>
                <button onClick={() => setShowLogin(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
                  Login
                </button>
                <button onClick={() => setShowRegister(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
                  Register
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Hi, {user.email}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md p-4 flex flex-col space-y-4">
            {menuItems.map(item => (
              <li
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className={`cursor-pointer transition-colors hover:text-blue-500 ${active === item.id ? "border-l-4 border-blue-500 pl-2" : ""}`}
              >
                {item.label}
              </li>
            ))}
            <div className="flex flex-col space-y-2 mt-4">
              {!user ? (
                <>
                  <button onClick={() => {setShowLogin(true); setIsOpen(false)}} className="bg-blue-500 text-white py-2 rounded-lg w-full">Login</button>
                  <button onClick={() => {setShowRegister(true); setIsOpen(false)}} className="bg-green-500 text-white py-2 rounded-lg w-full">Register</button>
                </>
              ) : (
                <button onClick={() => {handleLogout(); setIsOpen(false)}} className="bg-red-500 text-white py-2 rounded-lg w-full">Logout</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showLogin && <Login onClose={() => setShowLogin(false)} openRegister={() => { setShowLogin(false); setShowRegister(true); }} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} openLogin={() => { setShowRegister(false); setShowLogin(true); }} />}
    </>
  );
};

export default NavBar;
