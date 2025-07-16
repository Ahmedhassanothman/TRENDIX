import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { motion } from "framer-motion";
import { FiShare2 } from "react-icons/fi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ImageMagnifier from "../../components/pageProps/productDetails/ImageMagnifier";
import ProductTabs from "../../components/pageProps/productDetails/ProductTabs";
import RelatedProducts from "../../components/pageProps/productDetails/RelatedProducts";
import ProductComments from "../../components/ProductComments";

const ProductDetails = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [selectedTab, setSelectedTab] = useState("description");

  // Example of a current user (link it with your user system)
  const user = {
    userId: "demoUserId123", // Replace with the actual user ID
    userName: "Username"
  };

  // Simulate multiple product images
  const productImages = [
    productInfo.img,
    productInfo.img, // Replace with actual additional images
    productInfo.img,
  ];

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
  }, [location]);

  // Update comments when a new comment is added
  const handleCommentsUpdate = (updatedComments) => {
    setProductInfo((prev) => ({ ...prev, comments: updatedComments }));
  };

  return (
    <div className="w-full">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        
        {/* Main Product Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-8 h-full -mt-5 xl:-mt-8 pb-10 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
          {/* Product Images */}
          <div className="xl:col-span-7">
            <div className="sticky top-5">
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageMagnifier
                    src={productImages[currentImageIndex]}
                    alt={productInfo.productName}
                  />
                </motion.div>
                
                {/* Thumbnail Images */}
                <div className="flex gap-4 mt-4">
                  {productImages.map((img, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      className={`w-20 h-20 cursor-pointer border-2 rounded-lg overflow-hidden
                        ${currentImageIndex === index ? "border-blue-500" : "border-gray-200"}`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="xl:col-span-5">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white"
                >
                  {productInfo.productName}
                </motion.h1>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsWishlist(!isWishlist)}
                    className="text-2xl text-gray-500 hover:text-red-500 transition-colors"
                  >
                    {isWishlist ? <BsHeartFill className="text-red-500" /> : <BsHeart />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-2xl text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FiShare2 />
                  </motion.button>
                </div>
              </div>
              
              <ProductInfo productInfo={productInfo} />
            </div>
          </div>
        </div>

        {/* Product Tabs & Additional Info */}
        <div className="mt-16">
          <ProductTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            productInfo={productInfo}
          />
        </div>

        {/* Product Comments Section */}
        <div className="mt-16">
          <ProductComments
            product={productInfo}
            user={user}
            onCommentsUpdate={handleCommentsUpdate}
          />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts category={productInfo.category} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
