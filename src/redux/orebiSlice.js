import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  priceFilter: {
    min: null,
    max: null
  }
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Check if the exact variant already exists in cart
      const existingItem = state.products.find(
        (product) => product._id === item._id
      );

      if (existingItem) {
        // Update quantity if the same variant exists
        existingItem.quantity += item.quantity;
      } else {
        // Add new item if it doesn't exist
        state.products.push(item);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload
      );
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    clearPriceFilter: (state) => {
      state.priceFilter = {
        min: null,
        max: null
      };
    }
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  setPriceFilter,
  clearPriceFilter
} = orebiSlice.actions;
export default orebiSlice.reducer;
