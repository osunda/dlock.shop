'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Market = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('buy');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeOutOpacity = Math.max(1 - scrollY / 500, 0);

  const tabs = ['Buy', 'Sell', 'Deposit/Cashout', 'History'];

  const handleTabClick = (tab: string) => {
    if (tab.toLowerCase() === 'history') {
      router.push('/history');
    } else {
      setActiveTab(tab.toLowerCase());
    }
  };

  return (
    <div className="relative bg-[#0F1117] min-h-screen overflow-x-hidden">
      <div 
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/dlockland.png')", 
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          opacity: fadeOutOpacity,
          filter: 'blur(5px)'
        }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0F1117] opacity-90 z-20"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-30 pt-24 px-4 md:px-8 flex h-screen"
      >
        {/* Sidebar with Tabs and Filters */}
        <div className="w-64 mr-4 flex flex-col">
          {/* Vertical Tabs */}
          <div className="mb-6">
            {tabs.map((tab) => (
              tab.toLowerCase() === 'history' ? (
                <Link href="/history" key={tab} passHref>
                  <button
                    className={`w-full text-left py-2 px-4 mb-2 rounded bg-[#1C1F29] text-gray-300 hover:bg-[#232732]`}
                  >
                    {tab}
                  </button>
                </Link>
              ) : (
                <button
                  key={tab}
                  className={`w-full text-left py-2 px-4 mb-2 rounded ${
                    activeTab === tab.toLowerCase() ? 'bg-[--main-gold] text-white' : 'bg-[#1C1F29] text-gray-300 hover:bg-[#232732]'
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              )
            ))}
          </div>

          {/* Filters */}
          <div className="bg-[#1C1F29] p-4 rounded-lg flex-grow">
            <h2 className="text-xl font-bold text-white mb-4">Filter</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Price</label>
                <div className="flex space-x-2">
                  <input type="text" placeholder="Min" className="w-1/2 bg-[#232732] text-white p-2 rounded" />
                  <input type="text" placeholder="Max" className="w-1/2 bg-[#232732] text-white p-2 rounded" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Hero</label>
                <select className="w-full bg-[#232732] text-white p-2 rounded">
                  <option>All Heroes</option>
                  {/* Add hero options here */}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Color</label>
                <select className="w-full bg-[#232732] text-white p-2 rounded">
                  <option>All Colors</option>
                  {/* Add color options here */}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Rarity</label>
                <select className="w-full bg-[#232732] text-white p-2 rounded">
                  <option>All Rarities</option>
                  <option>Common</option>
                  <option>Rare</option>
                  <option>Epic</option>
                  <option>Legendary</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow bg-[#1C1F29] rounded-lg overflow-hidden">
          <div className="p-4">
            <input 
              type="text" 
              placeholder="Search for items..." 
              className="w-full bg-[#2B2F3C] text-white p-2 rounded"
            />
          </div>
          <div className="custom-scrollbar grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 overflow-y-auto" style={{height: 'calc(100vh - 200px)'}}>
            {/* Example item cards */}
            {[...Array(30)].map((_, index) => (
              <div key={index} className="bg-[#232732] p-4 rounded-lg flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold mb-2">Item Name</h3>
                  <p className="text-gray-400 mb-4">$XX.XX</p>
                </div>
                <div className="bg-[#232732] h-40 mb-4 rounded"></div>
                <button className="bg-[--main-gold] text-white py-2 px-4 rounded hover:bg-opacity-90 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Market;