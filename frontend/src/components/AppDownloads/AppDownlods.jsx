import React from 'react'
import { assets } from '../../assets/assets'

const AppDownlods = () => {
  return (
        <div id="app-download"
               className="flex flex-col items-center justify-center text-center 
               bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600
               rounded-3xl py-12 px-6 my-16 mx-4 shadow-xl">
             <p className="text-white text-2xl md:text-3xl font-semibold leading-relaxed mb-6">
               For Better Experience Download <br /> Tomato App</p>

         <div className="flex items-center gap-5 mt-4">
             <img
                 src={assets.play_store}
                 alt="Play Store"
                 className="w-36 md:w-40 hover:scale-110 duration-300 cursor-pointer"/>
            <img
                src={assets.app_store}
                 alt="App Store"
                className="w-36 md:w-40 hover:scale-110 duration-300 cursor-pointer"/>
       </div>
    </div>
)
}

export default AppDownlods
