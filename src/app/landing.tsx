'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#0F1117] overflow-x-hidden"
    >
      <section className="relative h-screen flex flex-col justify-center items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-[8px]"
          style={{ backgroundImage: "url('/dlockland.png')" }}
        ></div>
        <div className="absolute inset-0 bg-[#0A0C12] opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C12] to-transparent"></div>
        
        <div className="relative z-10 text-left px-8 md:px-12 max-w-4xl mx-auto mt-[-20vh]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-8" style={{ lineHeight: '1.5' }}>
            The Best Marketplace for Deadlock Skins & Items
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10">
            Buy, sell, trade and view millions of skins in an efficient and secure manner. By far the best way to surf the deadlock economy.
          </p>
          <button className="explore-button text-white px-8 py-4 text-lg font-semibold shadow-xl">
            Start trading
          </button>
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;