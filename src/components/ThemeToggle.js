import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50
        ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-purple-600 text-white'}
        hover:scale-110 transition-all duration-300`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <SunIcon className="w-6 h-6" />
      ) : (
        <MoonIcon className="w-6 h-6" />
      )}
    </motion.button>
  );
};

export default ThemeToggle; 