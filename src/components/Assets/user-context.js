import React, { useReducer, useContext } from "react";

const usersDetailsList = [
  {
    userId: "user-1",
    userName: "prabhu",
    email: "prabhu@gmail.com",
    mobileNumber: "9876543210",
    password: "something",
    role: "customer",
    active:"false",
  },
  {
    userId: "user-2",
    userName: "Yugenth",
    email: "Yugenth@gmail.com",
    mobileNumber: "1234567890",
    password: "logesh@kiot",
    role: "customer",
    active:"false",
  },
  {
    userId: "user-3",
    userName: "Sanjay",
    email: "sanjaykmsmoorthy@gmail.com",
    mobileNumber: "7836546729",
    password: "123456",
    role: "customer",
    active:"false",
  },
  {
    userId: "user-4",
    userName: "ADMIN",
    email: "admin@gmail.com",
    mobileNumber: "9087653480",
    password: "admin",
    role: "admin",
    active:"false",
  },
];

const UserContext = React.createContext({
  usersList: [],
  userDispatchFn: () => {},
});

const userReducer = (prevState, action) => {
  let updatedArray;
  if (action.type === "GET_USERS") {
    updatedArray = [...action.value];
    return updatedArray;
  } else if (action.type === "ADD_USER") {
    const newUser = action.value;
    updatedArray = [...prevState, newUser];
    return updatedArray;
  } else if (action.type === "EDIT_USER") {
    const exsistedUser = prevState.find((user) => {
      return action.value.userId === user.userId;
    });
    const index = prevState.indexOf(exsistedUser);
    updatedArray = [...prevState];
    updatedArray[index] = { ...action.value };
    return updatedArray;
  } else if (action.type === "DELETE_USER") {
    updatedArray = [
      ...prevState.filter((user) => {
        return action.value !== user.userId;
      }),
    ];
    return updatedArray;
  }
  return prevState;
};

const UserContextProvider = (props) => {
  const [usersList, userDispatchFn] = useReducer(userReducer, usersDetailsList);
  return (
    <UserContext.Provider
      value={{ usersList: usersList, userDispatchFn: userDispatchFn }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserCxt = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
