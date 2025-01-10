import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../store/orderSlice';
import { clearCart } from '../store/cardSlice';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const initialValues = {
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const onSubmit = (values) => {
    // Create the order object
    const order = {
      id: Date.now(), // Unique order ID
      date: new Date().toISOString().split('T')[0], // Current date
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0), // Calculate total
      shippingInfo: values, // Include shipping and payment info
    };

    // Dispatch the order to Redux store
    dispatch(addOrder(order));

    // Clear the cart
    dispatch(clearCart());

    // Show success message
    const alertBox = document.createElement('div');
    alertBox.textContent = 'Order placed successfully!';
    alertBox.className = 'fixed bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded shadow-lg';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 3000);

    // Log the order data (optional)
    console.log('Order Data:', order);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Checkout</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 1: Shipping Information</h2>
                
                {/* Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg text-gray-700">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label htmlFor="address" className="block text-lg text-gray-700">Address</label>
                  <Field
                    type="text"
                    name="address"
                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-blue-600 text-white max-md: py-3 px-1 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
                >
                  Next
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Step 2: Payment Information</h2>
                
                {/* Payment Method */}
                <div className="mb-6">
                  <label htmlFor="paymentMethod" className="block text-lg text-gray-700">Payment Method</label>
                  <Field
                    as="select"
                    name="paymentMethod"
                    className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select a payment method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </Field>
                  <ErrorMessage name="paymentMethod" component="div" className="text-red-500 mt-1" />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Checkout;
