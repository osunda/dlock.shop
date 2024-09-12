'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

interface Tweet {
  id: number;
  name: string;
  username: string;
  content: string;
  avatar: string;
}

const tweets: Tweet[] = [
  {
    id: 1,
    name: 'Sunda',
    username: 'sunnnnda',
    content: 'Deadlock will need a marketplace, and if this isnt the one, I dont know what is. @dlockshop',
    avatar: '/pfp1.jpeg',
  },
  {
    id: 2,
    name: 'Kafka',
    username: 'wenkafka',
    content: 'yo @dlockshop stats features is acc really cool',
    avatar: '/pfp2.jpeg',
  },
  {
    id: 3,
    name: 'Connor',
    username: 'sameollconnor',
    content: '@dlockshop, best marketplace out there. BY FARRR',
    avatar: '/pfp3.jpeg',
  },
  {
    id: 4,
    name: 'Spidey',
    username: 'spidayy2',
    content: 'If you aint using @dlockshop, what are you doing...',
    avatar: '/pfp4.jpeg',
  },
  {
    id: 5,
    name: 'Looms',
    username: 'looomsey',
    content: '@dlockshop yo frl love what you guys are buiding',
    avatar: '/pfp5.jpeg',
  },
  {
    id: 6,
    name: 'Klovey',
    username: 'reactklovey',
    content: 'I vouch @dlock.shop',
    avatar: '/pfp6.jpeg',
  },
  {
    id: 7,
    name: 'Alex',
    username: 'alexbuffat',
    content: '@dlockshop, definitely one of the best marketplaces I have used.',
    avatar: '/pfp7.jpeg',
  },
];

const InfiniteScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={tweet.avatar}
                  alt={tweet.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="font-bold text-sm">{tweet.name}</p>
                <p className="text-gray-400 text-xs">@{tweet.username}</p>
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