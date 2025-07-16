import React from 'react';
import { motion } from 'framer-motion';

const SuggestedQuestions = ({ questions, onSelect }) => {
  return (
    <div className="p-4 bg-gray-50 border-t border-gray-100">
      <h4 className="text-sm font-medium text-gray-600 mb-2" dir="rtl">أسئلة مقترحة:</h4>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(question)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-sm text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 hover:border-black transition-colors"
            dir="rtl"
          >
            {question}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions; 