import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import AdminNavBar from "../Navbar/AdminNavBar";
import UserNavbar from "../Navbar/UserNavBar";
import { useAuthCxt } from "../Assets/auth-context";

function HomePage(props) {
  const authCxt = useAuthCxt();
  const { userInfo, isLogged } = authCxt;
  let navbar;
  if (isLogged && userInfo.userType === "admin") {
    navbar = <AdminNavBar />;
  } else if (isLogged && userInfo.userType === "customer") {
    navbar = <UserNavbar />;
  }
  return (
    <Fragment>
      {navbar}
      <Outlet />
    </Fragment>
  );
}

export default HomePage;