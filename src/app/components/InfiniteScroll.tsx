'use client';

import React, { useRef, useEffect, useState } from 'react';
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
    content: 'Deadlock will need a marketplace, and if this isnt the one, I dont know what will. @dlockshop',
    avatar: '/pfp1.jpg',
  },
  {
    id: 2,
    name: 'Kafka',
    username: 'wenkafka',
    content: 'yo @dlockshop, stats features is acc really cool',
    avatar: '/pfp2.jpg',
  },
  {
    id: 3,
    name: 'Connor',
    username: 'sameollconnor',
    content: '@dlockshop, best marketplace out there. BY FARRR',
    avatar: '/pfp3.jpg',
  },
  {
    id: 4,
    name: 'Spidey',
    username: 'spidayy2',
    content: 'If you aint using @dlockshop, what are you doing...',
    avatar: '/pfp4.jpg',
  },
  {
    id: 5,
    name: 'Looms',
    username: 'looomsey',
    content: '@dlockshop yo frl love what you guys are buiding',
    avatar: '/pfp5.jpg',
  },
  {
    id: 6,
    name: 'Klovey',
    username: 'reactklovey',
    content: 'I vouch @dlock.shop',
    avatar: '/pfp6.jpg',
  },
  {
    id: 7,
    name: 'Alex',
    username: 'alexbuffat',
    content: '@dlockshop, definitely one of the best marketplaces I have used.',
    avatar: '/pfp7.jpg',
  },
];

const InfiniteScroll: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredTweetId, setHoveredTweetId] = useState<number | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const totalWidth = scrollContainer.scrollWidth / 2;
    let animationFrameId: number;

    const scroll = () => {
      if (!isHovering) {
        scrollPositionRef.current += 0.5;
        
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = 0;
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft = scrollPositionRef.current;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  const duplicatedTweets = [...tweets, ...tweets];

  return (
    <div 
      className="relative overflow-hidden" 
      style={{ height: '200px' }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0F1117] via-[#0F1117] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0F1117] via-[#0F1117] to-transparent z-10"></div>
      <div 
        ref={scrollRef} 
        className="flex space-x-4 p-4 overflow-x-hidden"
        style={{ width: '100%', height: '100%' }}
      >
        {duplicatedTweets.map((tweet: Tweet, index: number) => (
          <div 
            key={`${tweet.id}-${index}`}
            className={`flex-shrink-0 w-64 bg-[#1A1D24] rounded-lg shadow-md p-4 text-white transition-all duration-300 ${
              hoveredTweetId === tweet.id ? 'transform scale-105 bg-[#2A2D34]' : ''
            }`}
            onMouseEnter={() => setHoveredTweetId(tweet.id)}
            onMouseLeave={() => setHoveredTweetId(null)}
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