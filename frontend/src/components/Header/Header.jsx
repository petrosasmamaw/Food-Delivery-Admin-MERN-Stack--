import React from 'react';

const Header = () => {
  return (
    <header
      id="header"
      className="w-full flex justify-center scroll-mt-28"
    >
      <div
        className="w-full max-w-6xl rounded-3xl overflow-hidden relative flex items-center bg-cover bg-center shadow-xl"
        style={{ backgroundImage: "url('/header_img.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg animate-fadeIn">
            Order Your Favourite Food Here
          </h2>
          <p className="text-white text-lg md:text-xl drop-shadow-md animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and flavors. Satisfy your cravings and elevate your dining experience, one delicious meal at a time.
          </p>
          <button
            className="bg-white hover:bg-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg transition-all shadow-lg animate-fadeIn"
            style={{ animationDelay: '0.4s' }}
          >
            View Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
