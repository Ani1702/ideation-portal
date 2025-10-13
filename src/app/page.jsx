'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import our custom components
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingParticles from '../components/FloatingParticles';
import FuturisticForm from '../components/FuturisticForm';
import FuturisticTitle from '../components/FuturisticTitle';
import AnimatedLogo from '../components/AnimatedLogo';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [previousIdeas, setPreviousIdeas] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const notify = () => {
    toast.success("✅ Idea submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: '12px',
        color: '#ffffff',
        fontFamily: 'Orbitron, monospace',
        fontSize: '14px',
        fontWeight: '500'
      }
    });
  };

  const handleFormSubmit = ({ name, projectTitle, projectDetails }) => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}submit`, {
      name: name,
      idea: projectTitle,
      desc: projectDetails
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: 10000
    })
    .then((response) => {
      const newIdea = {
        idea: projectTitle,
        desc: projectDetails,
        name: name,
        timestamp: new Date().toISOString(),
      };
      setPreviousIdeas((prev) => [newIdea, ...prev]);
      notify();
    })
    .catch((error) => {
      console.error('Transmission Error:', error);
      toast.error("Failed to submit idea. Please try again.", {
        position: "top-right",
        style: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          color: '#ffffff',
          fontFamily: 'Orbitron, monospace',
          fontSize: '14px',
          fontWeight: '500'
        }
      });
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background */}
        <AnimatedBackground />
        
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Grid Pattern Overlay */}
        <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none z-10" />
        
        {/* Main Content */}
        <div className="relative z-20 min-h-screen flex flex-col">
          {/* Header with Animated Logo - Desktop Only */}
          <motion.header 
            className="absolute top-8 left-8 z-30 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Link href="/">
              <AnimatedLogo />
            </Link>
          </motion.header>

          {/* Navigation Dots */}
          <motion.nav 
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex flex-col space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full border border-neon-cyan/50 cursor-pointer hover:bg-neon-cyan/50 transition-all duration-300"
                  whileHover={{ scale: 1.5 }}
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(0,255,255,0)',
                      '0 0 20px rgba(0,255,255,0.5)',
                      '0 0 0px rgba(0,255,255,0)'
                    ]
                  }}
                  transition={{
                    delay: i * 0.5,
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.nav>

          {/* Main Content Container */}
          <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 lg:space-y-8">
            
            {/* Mobile Logo */}
            <motion.div 
              className="block lg:hidden mb-8 mt-4"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link href="/">
                <AnimatedLogo />
              </Link>
            </motion.div>

            {/* Futuristic Title */}
            <div className="mb-8 lg:mb-0">
              <FuturisticTitle />
            </div>

            {/* Main Form */}
            <motion.div 
              className="w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <FuturisticForm onSubmit={handleFormSubmit} />
            </motion.div>

            {/* Recent Ideas Display */}
            <AnimatePresence>
              {previousIdeas.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="w-full max-w-4xl mx-auto mt-16"
                >
                  <motion.h3 
                    className="text-2xl font-orbitron text-center mb-8 bg-gradient-to-r from-neon-pink to-neon-cyan bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Recent Ideas
                  </motion.h3>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {previousIdeas.slice(0, 6).map((idea, index) => (
                      <motion.div
                        key={`${idea.idea}-${index}`}
                        initial={{ opacity: 0, y: 20, rotateY: -10 }}
                        animate={{ opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-neon-cyan/30 transition-all duration-300"
                        whileHover={{ y: -5, scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-neon-pink/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <h4 className="font-orbitron text-lg text-neon-cyan mb-2 truncate">
                            {idea.idea}
                          </h4>
                          <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                            {idea.desc}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span>by {idea.name}</span>
                            <span>ID: #{String(index + 1).padStart(3, '0')}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Custom Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'transparent',
        }}
        toastClassName="font-sans"
      />
    </>
  );
}
