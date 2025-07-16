import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const items = paginationItems;

function Items({ currentItems }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {currentItems &&
        currentItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Product
              _id={item._id}
              img={item.img}
              productName={item.productName}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.des}
            />
          </motion.div>
        ))}
    </div>
  );
}

const Pagination = ({ itemsPerPage, searchQuery }) => {
  const priceFilter = useSelector((state) => state.orebiReducer.priceFilter);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let filtered = items;

    // Apply price filter
    if (priceFilter.min !== null && priceFilter.max !== null) {
      filtered = filtered.filter(item => {
        const price = parseFloat(item.price);
        return price >= priceFilter.min && price <= priceFilter.max;
      });
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.des.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [priceFilter, searchQuery]);

  return (
    <div>
      <div className="w-full">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Product
                  _id={item._id}
                  img={item.img}
                  productName={item.productName}
                  price={item.price}
                  color={item.color}
                  badge={item.badge}
                  des={item.des}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[400px] flex flex-col items-center justify-center">
            <motion.img
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              src="/images/no-results.svg"
              alt="No results"
              className="w-64 h-64 mb-4 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
