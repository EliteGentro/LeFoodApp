import React, { createContext, useReducer, useContext } from "react";

// Create contexts for cart state and dispatch
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer function to handle different actions on the cart state
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Use spread operator to add new item to the cart
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];

    case "REMOVE":
      // Create a new array and remove the item at the specified index
      return state.filter((_, index) => index !== action.index);

    case "UPDATE":
      // Map through the state and update the item if the id matches
      return state.map((food) =>
        food.id === action.id
          ? { ...food, qty: food.qty + parseInt(action.qty), price: food.price + action.price }
          : food
      );

    case "DROP":
      // Return an empty array to clear the cart
      return [];

    default:
      console.error("Reducer Error: Unknown action type");
      return state;
  }
};

// CartProvider component to provide cart state and dispatch contexts
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use cart state and dispatch contexts
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
