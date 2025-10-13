'use client';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="inset-0 z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, #ff00ff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00ffff 0%, transparent 50%), radial-gradient(circle at 40% 40%, #8000ff 0%, transparent 50%)",
            "radial-gradient(circle at 60% 30%, #ff00ff 0%, transparent 50%), radial-gradient(circle at 30% 70%, #00ffff 0%, transparent 50%), radial-gradient(circle at 70% 60%, #8000ff 0%, transparent 50%)",
            "radial-gradient(circle at 20% 80%, #ff00ff 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00ffff 0%, transparent 50%), radial-gradient(circle at 40% 40%, #8000ff 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Moving shapes */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-10"
        style={{
          background: "linear-gradient(45deg, #ff00ff, #00ffff)",
          filter: "blur(40px)",
        }}
        animate={{
          x: ["-10%", "110%"],
          y: ["-10%", "110%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-10"
        style={{
          background: "linear-gradient(135deg, #8000ff, #0080ff)",
          filter: "blur(30px)",
        }}
        animate={{
          x: ["110%", "-10%"],
          y: ["110%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
