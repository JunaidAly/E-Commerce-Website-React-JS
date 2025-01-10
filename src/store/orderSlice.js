import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [], // Array to store all orders
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload); // Add the new order to the orders array
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;