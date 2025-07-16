import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      
      {/* Search and Filter Bar */}
      <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="w-full md:w-96 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors md:hidden"
        >
          <IoFilterOutline />
          Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row pb-20 gap-10">
        {/* Sidebar - Hidden on mobile unless showFilters is true */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            display: showFilters || window.innerWidth >= 768 ? "block" : "none"
          }}
          transition={{ duration: 0.3 }}
          className={`w-full md:w-[300px] md:min-w-[300px] md:static fixed top-0 left-0 h-full z-50 bg-white dark:bg-gray-800 md:bg-transparent md:dark:bg-transparent ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div className="p-4 md:p-0">
            <ShopSideNav />
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="flex-grow">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          
          {/* Loading Animation */}
          {isLoading ? (
            <div className="w-full h-[200px] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Pagination 
                itemsPerPage={itemsPerPage}
                searchQuery={searchQuery}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Overlay for mobile filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowFilters(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default Shop;
