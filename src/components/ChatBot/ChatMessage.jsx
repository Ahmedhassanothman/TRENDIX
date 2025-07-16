import React from 'react';
import { motion } from 'framer-motion';

const ChatMessage = ({ message }) => {
  const isBot = message.type === 'bot';

  // تنسيق الوقت يدوياً
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] ${
          isBot
            ? 'bg-white text-black rounded-tr-xl rounded-br-xl rounded-bl-xl'
            : 'bg-black text-white rounded-tl-xl rounded-bl-xl rounded-br-xl'
        } p-4 shadow-md`}
      >
        <p className="text-sm" dir="rtl">{message.content}</p>
        <span
          className={`text-xs mt-2 block ${
            isBot ? 'text-gray-500' : 'text-gray-300'
          }`}
        >
          {formatTime(new Date(message.timestamp))}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage; 