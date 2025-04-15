import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Corrected import path for react-router-dom

// Login component to handle user authentication
function Login() {
  // State to manage user credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5500";
    const response = await fetch(`${API_URL}/api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(credentials), // Simplified body assignment
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Error: Enter Valid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  // Function to handle input changes
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Input field for email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>

          {/* Input field for password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <div className="container d-grid justify-content-center">
            {/* Submit button */}
            <button type="submit" className="m-3 btn btn-primary">
              Submit
            </button>
            {/* Link to signup page */}
            <Link to="/createuser" className="m-3 text-secondary">
              I don't have an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
