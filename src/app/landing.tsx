'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Chatbot } from './components/popup/chatbot';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  duration: number;
  inView: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <span className="text-6xl font-bold">
      {count.toLocaleString()}
      <span className="text-[--main-gold]">+</span>
    </span>
  );
};

const DynamicInfiniteScroll = dynamic(
  () => import('./components/InfiniteScroll'),
  {
    loading: () => <p>Loading tweets...</p>
  }
);

const DiscordPopup = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-[#5865F2] text-white p-4 rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-white"
          >
            ✕
          </button>
          <h3 className="font-bold mb-2">Join our Discord!</h3>
          <p className="mb-4">Be part of our growing community.</p>
          <a
            href="https://discord.gg/H9cnaTRSfe"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#5865F2] px-4 py-2 rounded-full font-bold hover:bg-opacity-90 transition-colors"
          >
            Join Now
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeOutOpacity = Math.max(1 - scrollY / 500, 0);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative bg-[#0F1117] overflow-x-hidden">
      <DiscordPopup />
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
        className="relative z-30"
      >
        <section className="min-h-screen flex flex-col justify-center items-start p-8 md:p-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-5" style={{ lineHeight: '1.2' }}>
            The Best Marketplace for Deadlock Skins
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12">
            Buy, sell, trade and view millions of skins in an efficient and secure manner. By far the best way to surf the deadlock economy.
          </p>
          <button className="explore-button text-white px-10 py-5 text-xl font-semibold shadow-xl">
            TRADE NOW
          </button>
        </section>

        {/* Number Ticker Section */}
        <motion.section
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="py-16 px-8 md:px-24 text-white bg-[#0F1117] bg-opacity-80"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-16 md:space-y-0">
            <div className="text-center">
              <AnimatedCounter end={2000} duration={2000} inView={inView} />
              <p className="text-2xl mt-4">Community Members</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={20000} duration={2500} inView={inView} />
              <p className="text-2xl mt-4">Daily Transactions</p>
            </div>
            <div className="text-center">
              <AnimatedCounter end={400000} duration={3000} inView={inView} />
              <p className="text-2xl mt-4">Skins Available</p>
            </div>
          </div>
        </motion.section>

        {/* Added margin-top to create more space */}
        <section className="py-16 px-8 md:px-24 mt-16">
          <h2 className="text-3xl font-bold text-left mb-8 text-white">What People Are Saying</h2>
          <DynamicInfiniteScroll />
        </section>
      </motion.div>

      {/* Move Chatbot to bottom left */}
      <div className="fixed bottom-4 left-4 z-50">
        <Chatbot />
      </div>
    </div>
  );
};

export default Landing;