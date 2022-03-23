import React, { useContext, useReducer } from "react";

const themeDetails = [
  {
    id: "theme-1",
    themeName: "Text printing",
    price: "1000",
    themeDesc:"Various colors with 3D",
  },
  {
    id: "theme-2",
    themeName: "Hand made printing",
    price: "12.99",
    themeDesc: "Frame printing",
  },
  {
    id: "theme-3",
    themeName: "Water printing",
    price: "48.54",
    themeDesc: "Emersive color",
  },
  {
    id: "theme-4",
    themeName: "Fire printing",
    price: "60.21",
    themeDesc: "Impressive colors",
  },
  {
    id: "theme-5",
    themeName: "Handmade gifts",
    price: "35.12",
    themeDesc: "Antique",
  },
];

const ThemeContext = React.createContext({
  themeList: [],
  themeDispatchFn: () => {},
});

const themeReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "ADD_PRODUCT") {
    action.value.id = `product-${prevState.length + 1}`;
    const newProduct = { ...action.value };
    updatedArray = [...prevState, newProduct];
    return updatedArray;
  } else if (action.type === "EDIT_PRODUCT") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });
    const index = prevState.indexOf(exsistedProduct);
    updatedArray = [...prevState];
    updatedArray[index] = action.value;
    return updatedArray;
  } else if (action.type === "DELETE_PRODUCT") {
    updatedArray = [
      ...prevState.filter((item) => {
        return item.id !== action.value;
      }),
    ];
    return updatedArray;
  } else if (action.type === "PLACE_ORDER") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });
    const index = prevState.indexOf(exsistedProduct);
    const tempProduct = { ...exsistedProduct };
    tempProduct.quantity = tempProduct.quantity - action.value.quantity;
    updatedArray = [...prevState];
    updatedArray[index] = tempProduct;
    return updatedArray;
  } else if (action.type === "CANCEL_ORDER") {
    const exsistedProduct = prevState.find((item) => {
      return item.id === action.value.id;
    });
    const index = prevState.indexOf(exsistedProduct);
    const tempProduct = { ...exsistedProduct };
    tempProduct.quantity = tempProduct.quantity + action.value.quantity;
    updatedArray = [...prevState];
    updatedArray[index] = tempProduct;
    return updatedArray;
  }
  return prevState;
};

 export const ThemeContextProvider = (props) => {
  const [themeList, themeDispatchFn] = useReducer(
    themeReducer,
    themeDetails
  );
  return (
    <ThemeContext.Provider
      value={{
       themeList:themeList,
       themeDispatchFn:themeDispatchFn,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeCxt = () => {
  return useContext(ThemeContext);
};

export default ThemeContext;