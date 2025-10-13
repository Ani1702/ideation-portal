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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Prevent scrolling only on desktop (md and above)
    const preventScroll = (e) => {
      if (window.innerWidth >= 768) { // Only prevent scroll on desktop
        e.preventDefault();
        return false;
      }
    };

    const preventKeyScroll = (e) => {
      if (window.innerWidth >= 768) { // Only prevent key scroll on desktop
        // Prevent arrow keys, page up/down, space, home, end
        const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (scrollKeys.includes(e.keyCode)) {
          e.preventDefault();
          return false;
        }
      }
    };

    // Limit scroll on mobile to 115dvh
    const limitMobileScroll = () => {
      if (window.innerWidth < 768) {
        const maxScroll = window.innerHeight * 0.15; // 15% extra (115dvh - 100dvh)
        if (window.scrollY > maxScroll) {
          window.scrollTo(0, maxScroll);
        }
      }
    };
    
    const updateScrollLock = () => {
      if (window.innerWidth >= 768) {
        // Lock scroll on desktop
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.height = '100vh';
      } else {
        // Allow limited scroll on mobile (max 115dvh)
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        document.body.style.height = '115dvh';
        document.body.style.maxHeight = '115dvh';
      }
    };
    
    // Initial scroll lock setup
    updateScrollLock();
    
    // Prevent scroll events
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });
    window.addEventListener('scroll', limitMobileScroll, { passive: true });
    
    // Update scroll lock on resize
    const handleResize = () => {
      checkMobile();
      updateScrollLock();
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      // Cleanup: restore scroll and remove listeners
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
      window.removeEventListener('scroll', limitMobileScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const notify = () => {
    toast.success("Idea submitted successfully!", {
      position: isMobile ? "top-center" : "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: !isMobile,
      style: {
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(34, 197, 94, 0.3)',
        borderRadius: isMobile ? '8px' : '12px',
        color: '#ffffff',
        fontFamily: 'Orbitron, monospace',
        fontSize: isMobile ? '13px' : '14px',
        fontWeight: '500',
        margin: isMobile ? '0 12px' : '0',
        maxWidth: isMobile ? 'calc(100vw - 24px)' : '320px',
        width: isMobile ? 'calc(100vw - 24px)' : '320px',
        padding: isMobile ? '12px 16px' : '16px',
        lineHeight: '1.4'
      }
    });
  };

  const handleFormSubmit = ({ name, projectTitle, projectDetails, enrollmentFeedback }) => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/submit`, {
      name: name || null, // Make name optional - send undefined if empty
      idea: projectTitle,
      desc: projectDetails,
      feedback: enrollmentFeedback
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: 20000
    })
    .then((response) => {
      const newIdea = {
        idea: projectTitle,
        desc: projectDetails,
        name: name,
        feedback: enrollmentFeedback,
        timestamp: new Date().toISOString(),
      };
      setPreviousIdeas((prev) => [newIdea, ...prev]);
      notify();
    })
    .catch((error) => {
      console.error('Transmission Error:', error);
      toast.error("Failed to submit idea. Please try again.", {
        position: isMobile ? "top-center" : "top-right",
        style: {
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: isMobile ? '8px' : '12px',
          color: '#ffffff',
          fontFamily: 'Orbitron, monospace',
          fontSize: isMobile ? '13px' : '14px',
          fontWeight: '500',
          margin: isMobile ? '0 12px' : '0',
          maxWidth: isMobile ? 'calc(100vw - 24px)' : '320px',
          width: isMobile ? 'calc(100vw - 24px)' : '320px',
          padding: isMobile ? '12px 16px' : '16px',
          lineHeight: '1.4'
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
      <div className="min-h-[115dvh] md:min-h-screen relative md:overflow-hidden bg-black">
        {/* Animated Background */}
        <div className="absolute inset-0 min-h-[115dvh] md:min-h-screen">
          <AnimatedBackground />
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 min-h-[115dvh] md:min-h-screen">
          <FloatingParticles />
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 min-h-[115dvh] md:min-h-screen grid-pattern opacity-20 pointer-events-none z-10" />
        
        {/* Main Content */}
        <div className="relative z-20 min-h-[115dvh] md:min-h-screen flex flex-col">
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
          <main className="flex-1 flex flex-col items-center justify-start px-4 py-4 lg:py-6 lg:space-y-4">
            
            {/* Mobile Logo */}
            <motion.div 
              className="block lg:hidden mb-6 mt-2"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link href="/">
                <AnimatedLogo />
              </Link>
            </motion.div>

            {/* Futuristic Title */}
            <div className="mb-4 lg:mb-0 lg:-mt-8 lg:relative lg:bottom-5">
              <FuturisticTitle />
            </div>

            {/* Main Form */}
            <motion.div 
              className="w-full max-w-3xl mx-auto relative bottom-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <FuturisticForm onSubmit={handleFormSubmit} />
            </motion.div>

            {/* Recent Ideas Display */}
            <AnimatePresence>
        
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Custom Toast Container */}
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={!isMobile}
        draggable={!isMobile}
        pauseOnHover={!isMobile}
        theme="dark"
        toastStyle={{
          background: 'transparent',
        }}
        toastClassName={isMobile ? "mobile-toast" : "desktop-toast"}
        style={{
          '--toastify-toast-width': isMobile ? 'calc(100vw - 24px)' : '320px',
          '--toastify-toast-min-height': '60px',
          top: '20px',
          left: isMobile ? '50%' : 'auto',
          right: isMobile ? 'auto' : '20px',
          transform: isMobile ? 'translateX(-50%)' : 'none',
          width: isMobile ? 'calc(100vw - 24px)' : '320px',
          maxWidth: isMobile ? 'calc(100vw - 24px)' : '320px'
        }}
      />
    </>
  );
}
