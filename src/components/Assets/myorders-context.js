import React, { useReducer, useContext, useEffect } from "react";

// const orderItems = [];

// MyOrders context
const MyOrdersContext = React.createContext({
  orderItems: [],
  myordersDispatchFn: () => {},
});

// Reducer fn
const myordersReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_ORDERS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "PLACE_ORDER") {
    const newOrder = action.value;
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newOrder),
    };
    fetch("https://evfmjj-8000.csb.app/ordersadd", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //------------------

    updatedArray = [{ ...action.value }, ...prevState];
    return updatedArray;
  } else if (action.type === "UPDATE_ORDER") {
    const exsistedItem = prevState.find((item) => {
      return item.orderId === action.value.orderId;
    });

    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(action.value),
    };
    fetch("https://evfmjj-8000.csb.app/ordersupdate", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    const index = prevState.indexOf(exsistedItem);
    updatedArray = [...prevState];
    updatedArray[index] = { ...action.value };
    return updatedArray;
  } else if (action.type === "CANCEL_ORDER") {
    const newVal = { orderId: action.value };
    //------------------
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newVal),
    };
    fetch("https://evfmjj-8000.csb.app/ordersdelete", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    //-----------------

    updatedArray = [
      ...prevState.filter((item) => {
        return item.orderId !== action.value;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

// MyOrdersContext Provider
export const MyOrdersContextProvider = (props) => {
  useEffect(() => {
    fetch("https://evfmjj-8000.csb.app/orders") // Replace with your API URL
      .then((response) => response.json())
      .then((data) => {
        myordersDispatchFn({ type: "GET_ORDERS", value: data });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);
  const [myordersState, myordersDispatchFn] = useReducer(myordersReducer, []);

  return (
    <MyOrdersContext.Provider
      value={{
        orderItems: myordersState,
        myordersDispatchFn: myordersDispatchFn,
      }}
    >
      {props.children}
    </MyOrdersContext.Provider>
  );
};

export const useMyOrdersCxt = () => {
  return useContext(MyOrdersContext);
};

export default MyOrdersContext;
