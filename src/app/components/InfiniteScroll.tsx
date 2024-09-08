'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Tweet {
  id: number;
  name: string;
  username: string;
  content: string;
  avatar: string;
}

const mockTweets: Tweet[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: 'Jack',
  username: '@jack',
  content: 'dlock is the best market ever',
  avatar: '/path/to/avatar.png', // Replace with actual avatar path
}));

const InfiniteScroll: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTweets(mockTweets.slice(0, 20));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [tweets]);

  return (
    <div className="relative overflow-hidden" style={{ height: '200px' }}>
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0F1117] via-[#0F1117] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0F1117] via-[#0F1117] to-transparent z-10"></div>
      <div 
        ref={scrollRef} 
        className="flex space-x-4 p-4 overflow-x-hidden"
        style={{ width: '100%', height: '100%' }}
      >
        {tweets.map((tweet: Tweet) => (
          <div 
            key={tweet.id} 
            className="flex-shrink-0 w-64 bg-[#1A1D24] rounded-lg shadow-md p-4 text-white"
          >
            <div className="flex items-center mb-2">
              <Image
                src={tweet.avatar}
                alt={tweet.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="ml-2">
                <p className="font-bold text-sm">{tweet.name}</p>
                <p className="text-gray-400 text-xs">{tweet.username}</p>
              </div>
            </div>
            <p className="text-sm">{tweet.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;