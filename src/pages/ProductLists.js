import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cardSlice'; // Ensure the correct import path
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      alert('Product is already in the cart.');
      return;
    }

    dispatch(addToCart(product));

    // Create and show the alert box
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Product added to cart successfully!';
    alertBox.className =
      'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg animate-bounce';
    document.body.appendChild(alertBox);

    // Remove the alert box after 2 seconds
    setTimeout(() => {
      alertBox.remove();
    }, 2000);
  };

return (
    <div className="bg-slate-300 min-h-screen p-4">
        <h1 className="text-2xl font-bold">Products</h1>

        {loading ? (
            <div className="text-center flex flex-col items-center mt-8 py-32">
                <svg
                    className="animate-spin h-10 w-10 text-blue-500 mb-4"
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
                <p>Loading products...</p>
            </div>
        ) : error ? (
            <div className="text-center text-red-500 mt-8">
                <p>{error}</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border p-4 rounded-lg transition-transform hover:scale-105"
                    >
                        <h2 className="text-xl font-semibold">{product.title}</h2>
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-64 object-cover mt-2 transition-transform hover:scale-105"
                        />
                        <p className="text-gray-600 font-semibold">
                            Category: {product.category}
                        </p>
                        <p className="text-gray-600 font-bold">
                            Rating: {product.rating.rate}
                        </p>
                        <p className="text-gray-600 font-extrabold">
                            Price: ${product.price}
                        </p>
                        <div className="flex mt-4">
                            <Link
                                to={`/product/${product.id}`}
                                className="bg-blue-500 text-white py-2 px-4 rounded transition-transform hover:scale-105"
                            >
                                View Details
                            </Link>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-500 text-white py-2 px-4 rounded transition-transform hover:scale-105 ml-2"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);
};

export default ProductList;
