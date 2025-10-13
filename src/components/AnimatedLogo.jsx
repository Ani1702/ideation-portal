'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const AnimatedLogo = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile version - simple, small logo only
  if (isMobile) {
    return (
      <div className="relative">
        <Image
          src="/ieeecslogo.svg"
          width={120}
          height={120}
          alt="IEEE Computer Society Logo"
          className="relative z-10"
          priority
        />
      </div>
    );
  }

  // Desktop version - full animated logo
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Glow effect behind logo */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        animate={{
          boxShadow: [
            '0 0 20px #00ffff',
            '0 0 30px #ff00ff',
            '0 0 40px #8000ff',
            '0 0 30px #00ffff',
            '0 0 20px #ff00ff'
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Logo container */}
      <motion.div
        className="relative z-10 p-4 rounded-full backdrop-blur-sm bg-white/10 border border-white/20"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Image
          src="/ieeecslogo.svg"
          width={120}
          height={120}
          alt="IEEE Computer Society Logo"
          className="relative z-10 group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          priority
        />
      </motion.div>
      
      {/* Orbital rings */}
      <motion.div
        className="absolute inset-0 border border-neon-cyan/30 rounded-full"
        animate={{ rotate: -360 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'scale(1.2)' }}
      />
      
      <motion.div
        className="absolute inset-0 border border-neon-pink/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'scale(1.4)' }}
      />
    </motion.div>
  );
};

export default AnimatedLogo;
