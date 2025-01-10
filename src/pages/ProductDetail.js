import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cardSlice'; // Ensure the correct import path

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items); // Fetch cart items from Redux store

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        const alertBox = document.createElement('div');
        alertBox.textContent = 'Product is Already Added!';
        alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg animate-bounce';
        document.body.appendChild(alertBox);
        setTimeout(() => {
          alertBox.remove();
        }, 1000);
      const alertBox2 = document.createElement('div');
      alertBox.textContent = 'Product is Already Added!';
      alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg animate-bounce';
      document.body.appendChild(alertBox2);
      setTimeout(() => {
        alertBox.remove();
      }, 1000);
      return;
    }

    dispatch(addToCart(product)); // Dispatch the addToCart action

    // Show success message
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Product added to cart successfully!';
    alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg animate-bounce';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
          ></path>
        </svg>
        <p className="text-blue-500 ml-4">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{product.title}</h1>
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-gray-800">Price: ${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg transition-transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;