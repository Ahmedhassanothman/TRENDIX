import React from 'react';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';

const ProductTabs = ({ selectedTab, setSelectedTab, productInfo }) => {
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'reviews', label: 'Reviews (2)' },
  ];

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "March 15, 2024",
      comment: "Great product! The quality is excellent and it arrived quickly.",
      avatar: "https://ui-avatars.com/api/?name=John+Doe",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      date: "March 10, 2024",
      comment: "Very satisfied with the purchase. Would recommend to others.",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith",
    },
  ];

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'description':
        return (
          <div className="prose max-w-none dark:prose-invert">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {productInfo.des}
            </p>
            <ul className="mt-4 space-y-2">
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Modern design</li>
              <li>Easy to maintain</li>
            </ul>
          </div>
        );
      
      case 'additional':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Specifications</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 dark:text-gray-400">Brand</td>
                    <td className="py-2 font-medium">{productInfo.brand || 'Generic'}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 dark:text-gray-400">Color</td>
                    <td className="py-2 font-medium">{productInfo.color}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 dark:text-gray-400">Material</td>
                    <td className="py-2 font-medium">Premium Quality</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 text-gray-600 dark:text-gray-400">Weight</td>
                    <td className="py-2 font-medium">0.5 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shipping Information</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>Free shipping on orders over $50</li>
                <li>Express delivery available</li>
                <li>International shipping available</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        );
      
      case 'reviews':
        return (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">4.5</div>
                <div className="flex items-center justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AiFillStar
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4.5 ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-1">Based on 2 reviews</div>
              </div>
              <div className="flex-1">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b pb-6"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-3 text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="flex gap-8 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`relative py-4 text-lg font-medium transition-colors ${
              selectedTab === tab.id
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            {tab.label}
            {selectedTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductTabs; 