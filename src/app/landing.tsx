'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const DynamicInfiniteScroll = dynamic(
  () => import('./components/InfiniteScroll'),
  {
    loading: () => <p>Loading tweets...</p>
  }
);

const Landing = () => {
  return (
    <div className="relative min-h-screen bg-[#0F1117] overflow-x-hidden">
      <div 
        className="fixed inset-0 bg-cover bg-center filter blur-[8px] z-0"
        style={{ backgroundImage: "url('/dlockland.png')" }}
      ></div>
      <div className="fixed inset-0 bg-[#0F1117] opacity-90 z-10"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#0F1117] to-transparent z-20"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-30"
      >
        <section className="h-screen flex flex-col justify-center items-center">
          <div className="text-left px-8 md:px-12 max-w-4xl mx-auto mt-[-20vh]">
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

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">What People Are Saying</h2>
          <DynamicInfiniteScroll />
        </section>
      </motion.div>
    </div>
  );
};

export default Landing;