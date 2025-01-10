import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // Array to store all products
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload); // Add a new product
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload); // Delete a product by ID
    },
  },
});

export const { addProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;