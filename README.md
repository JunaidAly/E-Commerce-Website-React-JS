# E-Commerce Platform

This is a **fully responsive e-commerce platform** built using **React.js**, **Redux Toolkit**, **Tailwind CSS**, and **React Router**. The platform includes features like product listing, product details, a shopping cart, a multi-step checkout process, order history, and an admin panel for managing products and users.

## Features

- **Product Listing**: Display a list of products fetched from an API.
- **Product Details**: View detailed information about a product.
- **Shopping Cart**: Add/remove products and manage quantities.
- **Checkout**: Multi-step checkout process with form validation.
- **Order History**: View past orders.
- **Admin Panel**:
  - Add, delete, and manage products.
  - Manage user accounts (delete users, update roles).
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.

## Technologies Used

- **Frontend**:
  - React.js
  - Redux Toolkit (for state management)
  - Tailwind CSS (for styling)
  - React Router (for routing)
  - Formik & Yup (for form handling and validation)
- **API**:
  - FakeStore API (for product data)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open the app in your browser**:
   Visit `http://localhost:3000` to view the app.

## Folder Structure

```
ecommerce-app/
├── public/
├── src/
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   ├── store/               # Redux store and slices
│   ├── App.js               # Main app component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── package.json
├── README.md
└── tailwind.config.js       # Tailwind CSS configuration
```

## Redux Store

The Redux store is divided into the following slices:

- **`cartSlice`**: Manages the shopping cart state.
- **`ordersSlice`**: Manages the order history state.
- **`productsSlice`**: Manages the product list state.
- **`usersSlice`**: Manages the user accounts state.

## Usage

### Product Listing Page
- Displays a list of products fetched from the FakeStore API.
- Users can view product details or add products to the cart.

### Product Details Page
- Displays detailed information about a product.
- Users can add the product to the cart.

### Shopping Cart
- Displays the products added to the cart.
- Users can remove products or clear the entire cart.

### Checkout Page
- Multi-step checkout process with form validation.
- Users can place an order after filling in the required details.

### Order History Page
- Displays a list of past orders.

### Admin Panel
- **Add Product**: Admins can add new products with a name, price, and image.
- **Delete Product**: Admins can delete products from the list.
- **User Management**: Admins can delete users or update their roles.


