import React from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const orders = useSelector((state) => state.orders.orders); // Fetch orders from Redux store

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Order History</h1>
      
      {orders.length === 0 ? (
        <p className="text-xl text-center text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg p-6 shadow-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Order ID: <span className="text-blue-600">{order.id}</span></p>
              <p className="text-lg font-semibold">Date: <span className="text-gray-700">{order.date}</span></p>
              <p className="text-lg font-semibold">Total: <span className="text-green-600">${order.total.toFixed(2)}</span></p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items</h2>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 border-b">
                  <p className="text-gray-700">{item.name} - <span className="text-gray-500">${item.price}</span> x {item.quantity}</p>
                  <p className="text-lg font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
