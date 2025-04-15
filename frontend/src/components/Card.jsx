import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

// Card component to display individual food items
function Card(props) {
  const priceRef = useRef(); // Reference to the price select element
  const dispatch = useDispatchCart(); // Hook to dispatch actions to the cart context
  const data = useCart(); // Hook to retrieve the current cart state
  const options = props.options; // Options for food item sizes and prices
  const priceOptions = Object.keys(options[0]); // Extract keys from options for size selection
  const foodItem = props.foodItem; // Food item data passed as props
  const [qty, setQty] = useState(1); // State to manage quantity
  const [size, setSize] = useState(""); // State to manage selected size
  const finalPrice = qty * parseInt(options[0][size]); // Calculate final price based on quantity and size

  // Function to handle adding food item to the cart
  const handleAddToCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id && item.size === size);

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  // useEffect hook to set the initial size based on the priceRef value
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          style={{ height: "180px", objectFit: "fill" }}
          alt={foodItem.name} // Added alt attribute for accessibility
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text">{foodItem.description}</p>
          <div className="container w-100">
            {/* Select element to choose quantity */}
            <select
              className="m-2 h-100 bg-primary rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            {/* Select element to choose size */}
            <select
              className="m-2 h-100 bg-primary rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <br />
            <div className="d-inline h-100 fs-4">${finalPrice}</div>
          </div>
          <hr />
          {/* Button to add item to cart */}
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default Card;
