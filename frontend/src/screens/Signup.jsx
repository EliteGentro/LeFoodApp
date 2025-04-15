import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Corrected import path for react-router-dom

// Signup component to handle user registration
function Signup() {
  // State to manage user credentials
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5500";

    // Check if the email already exists in the database
    const emailCheckResponse = await fetch(`${API_URL}/api/checkemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ email: credentials.email }),
    });
    const emailCheckJson = await emailCheckResponse.json();

    if (emailCheckJson.exists) {
      alert("Error: Email already exists. Please use a different email.");
      return;
    }

    // Proceed with user creation if email does not exist
    const response = await fetch(`${API_URL}/api/createuser`, {
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
      alert("Sign Up Completed, Please Log In");
      navigate("/login");
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
          {/* Input field for name */}
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>

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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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

          {/* Input field for location */}
          <div className="form-group">
            <label className="form-label" htmlFor="location">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Enter Address"
              value={credentials.location}
              onChange={onChange}
            />
          </div>
          <div className="container d-grid justify-content-center">
            {/* Submit button */}
            <button type="submit" className="m-3 btn btn-primary">
              Submit
            </button>
            {/* Link to login page */}
            <Link to="/login" className="m-3 text-secondary">
              Already a User
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
