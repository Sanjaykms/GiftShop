import React, { useReducer, useContext } from "react";

// Images import


const cartItems = [];
// Cart context
const CartContext = React.createContext({
  cartItems: [],
  cartDispatchFn: () => {},
});

// Cart Reducer fn
const cartReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_CART_ITEMS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "ADD_TO_CART") {
    action.value.totalAmount = (
      action.value.quantity * action.value.price
    ).toFixed(2);
    updatedArray = [action.value, ...prevState];
    return updatedArray;
  } else if (action.type === "SAVE_EDITED_PRODUCT") {
    const exsistedItem = prevState.find((item) => {
      return action.value.giftId === item.giftId;
    });
    const index = prevState.indexOf(exsistedItem);
    action.value.totalAmount = (
      action.value.quantity * action.value.price
    ).toFixed(2);
    const cloneProduct = { ...action.value };
    updatedArray = [...prevState];
    updatedArray[index] = cloneProduct;
    return updatedArray;
  } else if (action.type === "REMOVE_FROM_CART") {
    updatedArray = [
      ...prevState.filter((item) => {
        return item.cartItemId !== action.value;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

// Cart Context Provider
 export const CartContextProvider = (props) => {
  const [cartState, cartDispatchFn] = useReducer(cartReducer, cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartState,
        cartDispatchFn: cartDispatchFn,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartCxt = () => {
  return useContext(CartContext);
};

export default CartContext;