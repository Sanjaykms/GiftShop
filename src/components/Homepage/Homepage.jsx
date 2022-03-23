import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";

import AdminNavBar from "../Navbar/AdminNavBar";
import UserNavbar from "../Navbar/UserNavBar";
import { useAuthCxt } from "../Assets/auth-context";

function HomePage(props) {
  const authCxt = useAuthCxt();
  let navbar;
  if (authCxt.isAdmin) {
    navbar = <AdminNavBar />;
  } else {
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