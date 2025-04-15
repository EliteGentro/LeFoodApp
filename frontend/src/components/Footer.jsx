import React from "react";
import { Link } from "react-router-dom"; // Corrected import path for react-router-dom

// Footer component to display the page's footer
function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          {/* Link to the home page */}
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            {/* Empty Link tag for potential future use */}
          </Link>
          {/* Footer text */}
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2025 LeFood, Inc
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
