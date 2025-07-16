import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageMagnifier = ({ src, alt }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const magnifierHeight = 150;
  const magnifierWidth = 150;
  const zoomLevel = 2;

  const handleMouseMove = (e) => {
    const elem = e.currentTarget;
    const { top, left, width, height } = elem.getBoundingClientRect();
    
    // Calculate cursor position
    const x = e.pageX - left - window.pageXOffset;
    const y = e.pageY - top - window.pageYOffset;
    
    // Set cursor position for magnifier
    setCursorPosition({ x, y });
    
    // Calculate relative position for zoomed image
    setPosition({
      x: (x / width) * 100,
      y: (y / height) * 100,
    });
  };

  return (
    <div className="relative">
      <motion.div
        className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
        onMouseEnter={() => setShowMagnifier(true)}
        onMouseLeave={() => setShowMagnifier(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={src}
          alt={alt}
          className="w-full object-cover rounded-xl"
        />
        
        {showMagnifier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute pointer-events-none border-2 border-blue-500 rounded-full"
            style={{
              height: `${magnifierHeight}px`,
              width: `${magnifierWidth}px`,
              top: cursorPosition.y - magnifierHeight / 2,
              left: cursorPosition.x - magnifierWidth / 2,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${position.x}% ${position.y}%`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ImageMagnifier; 