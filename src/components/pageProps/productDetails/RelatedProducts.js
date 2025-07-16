import React from 'react';
import { motion } from 'framer-motion';
import { paginationItems } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const RelatedProducts = ({ category }) => {
  const navigate = useNavigate();
  
  // Filter products by category and limit to 4 items
  const relatedProducts = paginationItems
    .filter(item => item.category === category && item._id !== category)
    .slice(0, 4);

  const handleProductClick = (product) => {
    navigate(`/product/${product.productName.toLowerCase().split(" ").join("")}`, {
      state: {
        item: product,
      },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <div className="relative pb-[100%]">
              <img
                src={product.img}
                alt={product.productName}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-sm rounded">
                  New
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {product.productName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-blue-600 font-medium">${product.price}</span>
                <span className="text-sm text-gray-500">{product.color}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts; 