import React, { Fragment } from "react";

import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

import { useCartCxt } from "../Assets/cart-context";
import { useAuthCxt } from "../Assets/auth-context";

const UserNavBar = () => {
  const authCxt = useAuthCxt();
  const cartCxt = useCartCxt();
  var count = 0;
  cartCxt.cartItems.map((cartItem, index) => {
    if (authCxt.userInfo.userId === cartItem.userId) {
      count++;
    }
  });
  return (
    <Fragment>
      <nav className={classes.header} id="userNavbar">
        <h1 className={classes.title}>Gift Shop</h1>
        <div className={classes.navlinks}>
          <ul>
            <NavLink
              to="Homepage"
              className={(navData) =>
                navData.isActive ? classes.active : undefined
              }
            >
              <li id="productHomeButton">Home</li>
            </NavLink>
            <NavLink
              to="Cart"
              className={(navData) =>
                navData.isActive ? classes.active : undefined
              }
            >
              <li id="productCartButton">
                Cart
                <span className={classes["cart-highlighter"]}>{count}</span>
              </li>
            </NavLink>
            <NavLink
              to="MyOrders"
              className={(navData) =>
                navData.isActive ? classes.active : undefined
              }
            >
              <li id="productOrdersButton">My Orders</li>
            </NavLink>
          </ul>
        </div>
        <button
          id="logout"
          className={classes.logout}
          onClick={authCxt.logoutHandler}
        >
          Logout
        </button>
      </nav>
    </Fragment>
  );
};

export default UserNavBar;
