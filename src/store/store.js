import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cardSlice';
import orderReducer from './orderSlice';
import productReducer from './productsSlice';
import userReducer from './usersSlice';
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer,
    users: userReducer,
  },
});