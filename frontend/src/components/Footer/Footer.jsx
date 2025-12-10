import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div id="footer" className="bg-gray-900 text-gray-200 py-12 scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        
        <div className="flex-1">
          <img src={assets.logo} alt="Logo" className="w-24 mb-4"/>
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente alias, minima quis praesentium illum similique.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6 cursor-pointer"/>
            <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6 cursor-pointer"/>
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-6 h-6 cursor-pointer"/>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-semibold mb-2">Company</h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="flex-1">
          <h2 className="font-semibold mb-2">Get in Touch</h2>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>+25198988****</li>
            <li>Contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="border-gray-700 my-6"/>
      <p className="text-center text-gray-500 text-sm">© 2024 Tomato. All rights reserved.</p>
    </div>
  );
};

export default Footer;
