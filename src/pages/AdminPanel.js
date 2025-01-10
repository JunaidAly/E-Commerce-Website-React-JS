import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from '../store/productsSlice'; // Import deleteProduct action
import { deleteUser, updateUserRole } from '../store/usersSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); // Fetch products from Redux store
  const users = useSelector((state) => state.users.users); // Fetch users from Redux store
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const [imagePreview, setImagePreview] = useState(null); // For displaying the uploaded image preview

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result }); // Save Base64 string
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert('Please fill in all fields and upload an image.'); // Validate form inputs
      return;
    }

    const product = {
      id: Date.now(), // Unique product ID
      ...newProduct,
      price: parseFloat(newProduct.price), // Convert price to a number
    };
    dispatch(addProduct(product)); // Add the product to Redux store
    setNewProduct({ name: '', price: '', image: '' }); // Clear the form
    setImagePreview(null); // Clear the image preview

    // Show success message
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Product added successfully!';
    alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 2000);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)); // Delete a product by ID

    // Show success message
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Product deleted successfully!';
    alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 2000);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id)); // Delete a user by ID
  };

  const handleUpdateUserRole = (id, role) => {
    dispatch(updateUserRole({ id, role })); // Update user role
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Admin Panel</h1>

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2 rounded-md w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 rounded-md w-full"
          />
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg shadow-md" />
            </div>
          )}
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md w-full md:w-auto hover:bg-blue-500"
        >
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="border p-4 mt-4 rounded-lg shadow-md bg-gray-50">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-md shadow-md" />
                <div className="ml-4">
                  <p className="text-xl font-semibold">{product.name}</p>
                  <p className="text-gray-700">Price: ${product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="mt-4 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-500"
              >
                Delete Product
              </button>
            </div>
          ))
        )}
      </div>

      {/* User Account Control */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">User Account Control</h2>
        {users.map((user) => (
          <div key={user.id} className="border p-4 mt-4 rounded-lg shadow-md bg-gray-50">
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Role: {user.role}</p>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-500"
              >
                Delete User
              </button>
              <select
                value={user.role}
                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                className="border p-2 rounded-md w-32"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
