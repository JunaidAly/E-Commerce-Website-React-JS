import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to hold cart items
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      }
      else {
        state.items.push({ ...product, quantity: 1 }); // Add new item to cart
      }
      
    },
    decreaseQuantity: (state, action) => {
        const product = action.payload;
        const existingItem = state.items.find((item) => item.id === product.id);
  
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity -= 1; // Decrease quantity if greater than 1
        }
      },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});


export const { addToCart, removeFromCart, clearCart ,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;