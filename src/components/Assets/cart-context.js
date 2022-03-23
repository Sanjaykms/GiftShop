import React, { useReducer, useContext } from "react";

// Images import
import PhotoFrame from "../../Images/photot-frame.jfif";
import AppleWatch from "../../Images/Apple-watch.jfif";

const cartItems = [
  {
    id: "product-1",
    url: AppleWatch,
    productName: "Watch I7",
    price: "1000",
    quantity: 2,
    totalAmount: "2000",
  },
  {
    id: "product-6",
    url: PhotoFrame,
    productName: "Photo-frame",
    price: "70.00",
    quantity: 1,
    totalAmount: "70.00",
  },
];
// Cart context
const CartContext = React.createContext({
  cartItems: [],
  cartDispatchFn: () => {},
});

// Cart Reducer fn
const cartReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "ADD_TO_CART") {
    const exsistedItem = prevState.find((item) => {
      return action.value.id === item.id;
    });
    const index = prevState.indexOf(exsistedItem);
    const cloneProduct = { ...exsistedItem };
    const newProduct = { ...action.value };

    if (index >= 0) {
      cloneProduct.quantity += 1;
      cloneProduct.totalAmount = (
        cloneProduct.quantity * cloneProduct.price
      ).toFixed(2);
      updatedArray = [...prevState];
      updatedArray[index] = cloneProduct;
    } else {
      newProduct.totalAmount = (
        action.value.quantity * action.value.price
      ).toFixed(2);
      updatedArray = [newProduct, ...prevState];
    }
    return updatedArray;
  } else if (action.type === "SAVE_EDITED_PRODUCT") {
    const exsistedItem = prevState.find((item) => {
      return action.value.id === item.id;
    });
    const index = prevState.indexOf(exsistedItem);
    const cloneProduct = { ...action.value };
    updatedArray = [...prevState];
    updatedArray[index] = cloneProduct;
    return updatedArray;
  } else if (action.type === "REMOVE_FROM_CART") {
    updatedArray = [
      ...prevState.filter((item) => {
        return item.id !== action.value;
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