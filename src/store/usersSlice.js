import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [
      { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
      { id: 2, name: 'User', email: 'user@example.com', role: 'user' },
    ], // Array to store all users
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload); // Add a new user
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload); // Delete a user by ID
    },
    updateUserRole: (state, action) => {
      const { id, role } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.role = role; // Update user role
      }
    },
  },
});

export const { addUser, deleteUser, updateUserRole } = usersSlice.actions;
export default usersSlice.reducer;