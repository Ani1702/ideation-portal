'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, Lightbulb, User, FileText, MessageSquare } from 'lucide-react';

const FuturisticForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [enrollmentFeedback, setEnrollmentFeedback] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, projectTitle, projectDetails, enrollmentFeedback });
    setName('');
    setProjectTitle('');
    setProjectDetails('');
    setEnrollmentFeedback('');
  };



  return (
    <div
      className="relative backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-2xl "
      style={{
        background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,41,59,0.9) 50%, rgba(51,65,85,0.85) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
      }}
    >
      
      <div className="relative z-10">
        <motion.h2 
          className="text-xl md:text-2xl font-bold text-center mb-4 text-white font-orbitron tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Submit your Project Idea
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <User className={`h-5 w-5 transition-colors ${focusedField === 'name' ? 'text-neon-cyan' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter your name (optional)"
              className="w-full pl-12 pr-4 py-3 md:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-300 font-orbitron text-sm"
            />
          </div>

          {/* Project Title Field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Lightbulb className={`h-5 w-5 transition-colors ${focusedField === 'title' ? 'text-neon-pink' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              onFocus={() => setFocusedField('title')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter project title"
              className="w-full pl-12 pr-4 py-3 md:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/50 transition-all duration-300 font-orbitron text-sm"
              required
            />
          </div>

          {/* Project Details Field */}
          <div className="relative">
            <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none z-10">
              <FileText className={`h-5 w-5 transition-colors ${focusedField === 'details' ? 'text-neon-cyan' : 'text-gray-400'}`} />
            </div>
            <textarea
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              onFocus={() => setFocusedField('details')}
              onBlur={() => setFocusedField(null)}
              placeholder="Describe your project idea in detail..."
              rows={3}
              className="w-full pl-12 pr-4 py-3 md:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 transition-all duration-300 resize-none font-orbitron text-sm leading-relaxed"
              required
            />
          </div>

          {/* Feedback Section */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-base font-orbitron text-center mb-3 text-white/90 font-semibold">
              Enrollments Feedback 
            </h3>
            
            <div className="relative">
              <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none z-10">
                <MessageSquare className={`h-5 w-5 transition-colors ${focusedField === 'feedback' ? 'text-neon-pink' : 'text-gray-400'}`} />
              </div>
              <textarea
                value={enrollmentFeedback}
                onChange={(e) => setEnrollmentFeedback(e.target.value)}
                onFocus={() => setFocusedField('feedback')}
                onBlur={() => setFocusedField(null)}
                placeholder="Any issues with last year's enrollments portal or the enrollments process?"
                rows={3}
                className="w-full pl-12 pr-4 py-3 md:py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink/50 transition-all duration-300 resize-none font-orbitron text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="group relative px-8 py-3 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 backdrop-blur-sm rounded-xl border border-neon-cyan text-white transition-all duration-300 hover:border-neon-pink hover:shadow-lg hover:shadow-neon-cyan/25 hover:scale-105"
            >
              <div className="relative flex items-center justify-center space-x-2 font-orbitron">
                <span className="text-base font-semibold text-white tracking-wide">
                  SUBMIT
                </span>
                <Send className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuturisticForm;
