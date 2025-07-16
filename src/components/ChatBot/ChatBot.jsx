import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdSend } from 'react-icons/io';
import { BsChatDots, BsThreeDots } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions = [
   
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      handleInitialMessage();
    }
  }, [isOpen]);

  const handleInitialMessage = async () => {
    setIsTyping(true);
    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'start'
        })
      });

      const data = await response.json();
      
      const botResponse = {
        id: 1,
        type: 'bot',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages([botResponse]);
    } catch (error) {
      console.error('خطأ في الاتصال:', error);
      const errorResponse = {
        id: 1,
        type: 'bot',
        content: 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
        timestamp: new Date(),
      };
      setMessages([errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage
        })
      });

      const data = await response.json();
      
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: data.reply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error);
      const errorResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question);
    inputRef.current?.focus();
    handleSend();
  };

  return (
    <div className="relative">
      {/* Chat Button in Navbar */}
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <BsChatDots className="w-6 h-6 text-[#767676] hover:text-[#262626] transition-colors duration-300" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          />
        </div>
        <span className="text-sm font-medium text-[#767676] hover:text-[#262626] transition-colors duration-300">Trendix Chat Recommendation</span>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute top-full right-0 mt-2 w-96 h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <BsChatDots className="text-blue-500 text-xl" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-lg">Trendix Chat Recommendation</h3>
                  <p className="text-sm text-blue-100">متصل الآن</p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <MdClose size={20} />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-180px)] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-gray-500"
                >
                  <BsThreeDots className="animate-bounce" />
                  <span className="text-sm">typing....</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <SuggestedQuestions
              questions={suggestedQuestions}
              onSelect={handleSuggestedQuestion}
            />

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
              <div className="flex items-start space-x-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="type here   ..."
                  className="flex-1 p-4 text-lg rounded-lg border-2 border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors min-h-[60px] max-h-[200px] resize-none overflow-y-auto"
                  dir="rtl"
                  disabled={isTyping}
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '60px',
                    maxHeight: '200px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-2"
                  disabled={isTyping || !inputMessage.trim()}
                >
                  <IoMdSend size={24} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot; 