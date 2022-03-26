import React, { Fragment } from "react";

import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useAuthCxt } from "../Assets/auth-context";

const AdminNavBar = (props) => {
  const authCxt = useAuthCxt();
  return (
    <Fragment>
      <nav className={classes.header} id="adminNavbar">
        <h1 className={classes.title}>Gift Shop</h1>
        <div className={classes.navlinks}>
          <ul>
            <NavLink
              to="/Admingifts"
              className={(navData) => {
                return navData.isActive ? classes.active : undefined;
              }}
            >
              <li id="adminProductButton">Gifts</li>
            </NavLink>
            <NavLink
              to="/admin/themes"
              className={(navData) => {
                return navData.isActive ? classes.active : undefined;
              }}
            >
              <li id="adminThemeButton">Themes</li>
            </NavLink>
            <NavLink
              to="/admin/orders"
              className={(navData) => {
                return navData.isActive ? classes.active : undefined;
              }}
            >
              <li id="adminOrdersButton">Orders</li>
            </NavLink>
            <NavLink
              to="/admin/users-list"
              className={(navData) => {
                return navData.isActive ? classes.active : undefined;
              }}
            >
              <li id="adminViewUsersButton">View Users</li>
            </NavLink>
          </ul>
        </div>
        <button
          id="admin-logout"
          className={classes.logout}
          onClick={authCxt.logoutHandler}
        >
          Logout
        </button>
      </nav>
    </Fragment>
  );
};

export default AdminNavBar;