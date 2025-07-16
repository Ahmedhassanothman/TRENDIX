import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sliderData } from '../../data/sliderData';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % sliderData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + sliderData.length) % sliderData.length);
  };

  return (
    <div className="relative h-[600px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute w-full h-full"
          style={{ backgroundColor: sliderData[currentSlide].backgroundColor }}
        >
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
              {/* Text Content */}
              <div className="space-y-6 lg:space-y-8 max-w-xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-lg text-gray-600 font-medium"
                >
                  Fashion Collection
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                >
                  {sliderData[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg lg:text-xl text-gray-600"
                >
                  {sliderData[currentSlide].subtitle}
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {sliderData[currentSlide].buttonText}
                </motion.button>
              </div>
              
              {/* Image */}
              <motion.div 
                className="relative h-[300px] lg:h-[450px] w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={sliderData[currentSlide].image}
                  alt={sliderData[currentSlide].title}
                  className="w-full h-full object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl shadow-inner bg-gradient-to-t from-black/10 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <BsArrowLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <BsArrowRight size={20} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-black' : 'w-2 bg-black/40 hover:bg-black/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider; 