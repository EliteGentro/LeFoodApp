# LeFood - Food Ordering App

Welcome to LeFood, a modern and intuitive food ordering app built with React and Bootstrap. This project aims to provide users with a seamless experience for browsing, ordering, and managing their favorite food items.

## Table of Contents
- Features
- [Installation](#installation)
- Usage
- API Endpoints
- Environment Variables
- Contributing
- License

## Features
- **User Authentication**: Sign up and log in to manage your orders.
- **Food Browsing**: Browse food items by category and search for specific items.
- **Cart Management**: Add, update, and remove items from your cart.
- **Order History**: View your past orders and order details.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation
To get started with the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**: Create a `.env` file in the root directory and add the following variables:
    ```env
    REACT_APP_URL=<your-react-app-url>
    MONGO_URI=<your-mongo-uri>
    ```

4. **Start the backend server**:
    ```bash
    npm nodemon index.js
    ```
    or
    ```bash
    npx nodemon index.js
    (for MacOS)
    ```

5. **Start the frontend development server**:
    ```bash
    npm run dev
    ```

## Usage
Once the development server is running, you can access the app at [http://localhost:5173]:

- **Sign Up**: Create a new account to start ordering food.
- **Log In**: Access your account to manage your orders.
- **Browse Food**: Explore various food items and categories.
- **Add to Cart**: Select items and add them to your cart.
- **Checkout**: Complete your order and view your order history.

## API Endpoints
The backend API provides several endpoints to manage user authentication, food data, and orders. Here are the main endpoints:

### User Authentication:
- `POST /api/createuser`: Create a new user.
- `POST /api/loginuser`: Log in an existing user.

### Food Data:
- `POST /api/foodData`: Retrieve food items and categories.

### Order Management:
- `POST /api/orderData`: Submit a new order.
- `POST /api/myOrderData`: Retrieve order history for a user.

## Environment Variables
The project uses environment variables to manage sensitive information. Ensure you have the following variables set in your `.env` file:

- `REACT_APP_URL`: The URL for the front end.
- `MONGO_URI`: The connection URI for MongoDB.

## Contributing
We welcome contributions to improve LeFood! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

Thank you for using LeFood! We hope you enjoy your food ordering experience. If you have any questions or need assistance, feel free to reach out.
