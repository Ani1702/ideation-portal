'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FuturisticTitle = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'IDEATION PORTAL';
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative text-center mb-8">
      <motion.h1 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-orbitron relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Main title with gradient */}
        <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-pink bg-clip-text text-transparent">
          {displayText}
        </span>
        
        {/* Blinking cursor */}
        <motion.span
          className="text-neon-cyan"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          |
        </motion.span>
      </motion.h1>
      
      {/* Underline effect */}
      <motion.div
        className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent mt-4"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 2, duration: 1 }}
      />
    </div>
  );
};

export default FuturisticTitle;
