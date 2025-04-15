import React, { useState } from "react";

// Carousel component to display a carousel with a search bar
function Carousel({ onSearch }) {
  const [search, setSearch] = useState(''); // State to manage search query

  // Handle the change in the search bar input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle the form submit and pass search query to the parent (main screen)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(search); // Pass the search query to the parent
  };

  return (
    <div> 
      <div id="carouselExample" className="carousel slide" style={{ objectFit: "contain" }}>
        <div className="carousel-inner" style={{ maxHeight: "500px" }}>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            {/* Search form */}
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-primary text-white bg-primary" type="submit">
                Search
              </button>
            </form>
          </div>
          {/* Carousel items */}
          <div className="carousel-item active">
            <img
              src="https://fpoimg.com/900x300?text=Food1&bg_color=e6e6e6&text_color=8F8F8F"
              className="d-block w-100"
              alt="Food1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://fpoimg.com/900x300?text=Food2&bg_color=e6e6e6&text_color=8F8F8F"
              className="d-block w-100"
              alt="Food2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://fpoimg.com/900x300?text=Food3&bg_color=e6e6e6&text_color=8F8F8F"
              className="d-block w-100"
              alt="Food3"
            />
          </div>
        </div>
        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
