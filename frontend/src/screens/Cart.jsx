import React from "react";
import trash from "../assets/trash.svg";
import { useCart, useDispatchCart } from "../components/ContextReducer";

// Cart component to display items in the cart and handle checkout
function Cart() {
  const data = useCart(); // Retrieve cart data using custom hook
  const dispatch = useDispatchCart(); // Hook to dispatch actions to the cart context

  // Display message if the cart is empty
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }

  // Function to handle checkout process
  const handleCheckOut = async () => {
    const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:5500";
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch(`${API_URL}/api/orderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
        order_date: new Date().toDateString()
      }),
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" }); // Clear the cart after successful checkout
    }
  };

  // Calculate total price of items in the cart
  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md" style={{ height: "80vh", overflowY: "scroll" }}>
        <table className="table table-hover">
          <thead className="text-primary fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>${food.price.toFixed(2)}</td> {/* Format price to two decimal places */}
                <td>
                  <img
                    src={trash}
                    alt="delete"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                    style={{ width: "25px", height: "25px", cursor: "pointer", filter: "brightness(0) invert(1)" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: ${totalPrice.toFixed(2)}</h1> {/* Format total price to two decimal places */}
        </div>
        <button className="btn bg-primary mt-5" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
