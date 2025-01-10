import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">MyStore</div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isOpen
                  ? "M6 18L18 6M6 6l12 12" // X icon
                  : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
              }
            />
          </svg>
        </button>

        {/* Navbar Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          }  md:flex md:space-x-4 md:items-center w-full md:w-auto bg-blue-550 md:bg-transparent mt-4 md:mt-0`}
        >
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/" className="text-white block px-3 py-2">
              Home
            </Link>
          </li>
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/products" className="text-white block px-3 py-2">
              Products
            </Link>
          </li>
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/cart" className="text-white block px-3 py-2">
              Cart
            </Link>
          </li>
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/checkout" className="text-white block px-3 py-2">
              Checkout
            </Link>
          </li>
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/orders" className="text-white block px-3 py-2">
              Orders
            </Link>
          </li>
          <li className="transition-transform hover:shadow-lg hover:font-bold">
            <Link to="/admin" className="text-white block px-3 py-2">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
