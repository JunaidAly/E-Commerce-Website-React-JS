import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart, addToCart, decreaseQuantity } from '../store/cardSlice'; // Ensure the correct import path

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle quantity change
  const handleIncrease = (item) => {
    dispatch(addToCart(item)); // Dispatch add to cart with increased quantity
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item)); // Dispatch decrease quantity if greater than 1
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          <p className="text-2xl">Your cart is empty.</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-4 px-2 gap-6"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />

              {/* Product Details */}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600">Price: <span className="font-medium">${item.price.toFixed(2)}</span></p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDecrease(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleIncrease(item)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-200"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Clear Cart */}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
            </p>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
