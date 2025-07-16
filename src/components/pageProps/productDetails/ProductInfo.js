import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { motion } from "framer-motion";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdCheckmark } from "react-icons/io";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  const sizes = ["XS", "S", "M", "L", "XL"];
  const inStock = true;

  // Safely handle color array
  const colors = productInfo?.color ? 
    (typeof productInfo.color === 'string' ? productInfo.color.split(',') : [productInfo.color]) 
    : [];

  const handleAddToCart = () => {
    // Create a unique ID for each product variant
    const variantId = `${productInfo._id}-${selectedSize}-${colors[selectedColor]}`;
    
    dispatch(
      addToCart({
        _id: variantId, // Use the variant ID instead of just the product ID
        productId: productInfo._id, // Keep the original product ID
        name: productInfo.productName,
        quantity: quantity,
        image: productInfo.img,
        badge: productInfo.badge,
        price: productInfo.price,
        color: colors[selectedColor],
        size: selectedSize,
      })
    );

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset quantity after adding to cart
      setQuantity(1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price and Rating */}
      <div className="flex items-center justify-between">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-blue-600"
        >
          ${productInfo?.price || 0}
        </motion.p>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <AiFillStar
                key={star}
                className="w-5 h-5 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">(24 reviews)</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {productInfo?.des || 'No description available'}
      </p>

      {/* Color */}
      {colors.length > 0 && (
        <div>
          <p className="font-medium text-lg mb-2">Color</p>
          <div className="flex items-center gap-2">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedColor(index)}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  selectedColor === index 
                    ? 'ring-2 ring-offset-2 ring-blue-500' 
                    : 'border-2 border-gray-300'
                }`}
                style={{ 
                  backgroundColor: color.trim().toLowerCase(),
                  borderColor: color.trim().toLowerCase() === 'white' ? '#e5e7eb' : 'transparent'
                }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Selected: {colors[selectedColor]?.trim()}
          </p>
        </div>
      )}

      {/* Size */}
      <div>
        <p className="font-medium text-lg mb-2">Size</p>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSize(size)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium transition-colors ${
                selectedSize === size
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className="font-medium text-lg mb-2">Quantity</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 border-x">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={!inStock}
        className={`relative w-full py-4 rounded-lg text-lg font-medium flex items-center justify-center gap-2 transition-colors ${
          inStock
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <HiOutlineShoppingBag className="w-6 h-6" />
        Add to Cart
        
        {/* Success Animation */}
        {showSuccess && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute right-4 bg-green-500 text-white p-1 rounded-full"
          >
            <IoMdCheckmark className="w-5 h-5" />
          </motion.div>
        )}
      </motion.button>

      {/* Additional Info */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>SKU: {productInfo?._id || 'N/A'}</p>
        <p>Categories: Fashion, Trending</p>
        <p>Tags: Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductInfo;
