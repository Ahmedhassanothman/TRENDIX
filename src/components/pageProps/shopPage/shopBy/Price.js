import React from "react";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter, clearPriceFilter } from "../../../../redux/orebiSlice";

const Price = () => {
  const dispatch = useDispatch();
  const priceFilter = useSelector((state) => state.orebiReducer.priceFilter);
  
  const priceList = [
    {
      _id: 950,
      priceOne: 0.0,
      priceTwo: 49.99,
    },
    {
      _id: 951,
      priceOne: 50.0,
      priceTwo: 99.99,
    },
    {
      _id: 952,
      priceOne: 100.0,
      priceTwo: 199.99,
    },
    {
      _id: 953,
      priceOne: 200.0,
      priceTwo: 399.99,
    },
    {
      _id: 954,
      priceOne: 400.0,
      priceTwo: 599.99,
    },
    {
      _id: 955,
      priceOne: 600.0,
      priceTwo: 1000.0,
    },
  ];

  const handlePriceFilter = (priceOne, priceTwo) => {
    if (priceFilter?.min === priceOne && priceFilter?.max === priceTwo) {
      // If clicking the same range, clear the filter
      dispatch(clearPriceFilter());
    } else {
      // Set new price filter
      dispatch(setPriceFilter({
        min: priceOne,
        max: priceTwo
      }));
    }
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item) => (
            <li
              key={item._id}
              onClick={() => handlePriceFilter(item.priceOne, item.priceTwo)}
              className={`border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 ${
                priceFilter?.min === item.priceOne && priceFilter?.max === item.priceTwo
                  ? "text-primeColor font-medium"
                  : ""
              }`}
            >
              ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
