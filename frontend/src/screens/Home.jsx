import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import Card from "../components/Card";

// Home component to display the homepage of the app
function Home() {
  // API URL for fetching food data
  const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5500";
  // State to store food categories
  const [foodCategory, setFoodCategory] = useState([]);
  // State to store food items
  const [foodItem, setFoodItem] = useState([]);
  // State to store search query
  const [search, setSearch] = useState('');

  // Function to handle search input
  const handleSearch = (search) => {
    setSearch(search);
  };

  // Function to load food data from the API
  const loadData = async () => {
    let response = await fetch(`${API_URL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    response = await response.json();

    setFoodItem(response[0]);
    setFoodCategory(response[1]);
  };

  // useEffect hook to load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar /> {/* Navbar component */}
      </div>

      <div>
        <Carousel onSearch={handleSearch} /> {/* Carousel component with search handler */}
      </div>

      <div className="container">
        {/* Conditionally render food categories */}
        {foodCategory && foodCategory.length > 0 && foodCategory.map((data) => (
          <div className="row mb-3" key={data._id}>
            <div className="fs-3 m-3">
              {data.CategoryName} {/* Display category name */}
            </div>
            <hr />
            {/* Conditionally render food items within each category */}
            {foodItem && foodItem.length > 0 && foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map(
              (filteredItem) => (
                <div key={filteredItem._id} className="col-12 col-sm-8 col-md-6 col-lg-4">
                  <Card foodItem={filteredItem} options={filteredItem.options} /> {/* Card component for each food item */}
                </div>
              )
            )}
            {foodItem && foodItem.length === 0 && <div>No Data Found</div>}
          </div>
        ))}
        {foodCategory && foodCategory.length === 0 && <div>No Data Found</div>}
      </div>

      <div>
        <Footer /> {/* Footer component */}
      </div>
    </div>
  );
}

export default Home;
