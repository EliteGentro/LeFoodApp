import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrected import path for react-router-dom
import Badge from 'react-bootstrap/Badge';
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";

// Navbar component to display navigation links and cart information
function Navbar() {
  // State to manage the visibility of the cart modal
  const [cartView, setCartView] = useState(false);
  // Retrieve cart data using custom hook
  const data = useCart(); // const values are used for data to enforce immutability
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            LeFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mt-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {/* Conditionally render 'My Orders' link if user is authenticated */}
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {/* Conditionally render 'Login' and 'SignUp' links if user is not authenticated */}
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-primary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-primary mx-1" to="/createuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <>
                {/* Button to open cart modal */}
                <div className="btn bg-white text-primary mx-2" onClick={() => setCartView(true)}>
                  My Cart {" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {/* Conditionally render cart modal if cartView is true */}
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                {/* Button to handle user logout */}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>Logout</div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
