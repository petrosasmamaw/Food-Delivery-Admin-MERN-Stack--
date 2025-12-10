import React from 'react';
import { assets, menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  const handleClick = (menuName) => {
    setCategory(category === menuName ? 'All' : menuName);
  };

  return (
    <section id="explore-menu" className="py-16 bg-gray-50 scroll-mt-28">
      <div className="max-w-4xl mx-auto text-center mb-8 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Explore Our Menu</h1>
        <p className="text-gray-600 text-base md:text-lg">
          Choose from a diverse menu featuring a delectable array of dishes. Satisfy your cravings and elevate your dining experience.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item.menu_name)}
              className={`flex-1 cursor-pointer bg-white rounded-xl shadow-lg transform transition-all duration-300 min-w-[150px]
                ${category === item.menu_name
                  ? 'border-4 border-blue-500 scale-105 shadow-2xl'
                  : 'hover:shadow-2xl hover:-translate-y-1'
                }`}
            >
              <img src={item.menu_image} alt={item.menu_name} className="w-full h-28 object-cover" />
              <div className="p-3 text-center">
                <p className={`text-sm font-semibold truncate ${category === item.menu_name ? 'text-blue-600' : 'text-gray-800'}`}>
                  {item.menu_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-t-4 border-blue-500 w-1/2 mx-auto mt-12" />
    </section>
  );
};

export default ExploreMenu;
