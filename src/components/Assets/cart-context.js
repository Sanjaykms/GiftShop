import React, { useReducer, useContext, useEffect } from "react";

// Images import

// const cartItems = [];
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

    const newCart = action.value;
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCart),
    };
    fetch("https://evfmjj-8000.csb.app/cartsadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //------------------

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

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://evfmjj-8000.csb.app/cartsupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [...prevState];
    updatedArray[index] = cloneProduct;
    return updatedArray;
  } else if (action.type === "REMOVE_FROM_CART") {
    const newVal = { cartItemId: action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    };
    fetch("https://evfmjj-8000.csb.app/cartsdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

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
  useEffect(() => {
    fetch("https://evfmjj-8000.csb.app/carts") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        cartDispatchFn({ type: "GET_CART_ITEMS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching Carts:", error);
      });
  }, []);
  const [cartState, cartDispatchFn] = useReducer(cartReducer, []);

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
