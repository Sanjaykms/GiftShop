import React from "react";

import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const qty = `${props.quantity} ps`;
  const them =
    props.themeName == undefined ? (
      ""
    ) : props.themeName === "" ? (
      <div>No Theme</div>
    ) : (
      <div>{props.themeName + " - $" + props.themePrice}</div>
    );
  const proPrice =
    props.price == undefined ? (
      <div>{props.productName}</div>
    ) : (
      <div>{props.productName + " - $" + props.price}</div>
    );
  return (
    <div className={classes["item-container"]}>
      {proPrice}
      <div>{qty}</div>
      {them}
      <div>${props.totalAmount}</div>
      <div>
        <MdModeEdit
          color="blue"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (props?.place === "cart") {
              props.onOpen(props.cartItemId);
            } else {
              props.onOpen(props.orderId);
            }
          }}
        />
        {props?.place === "cart" ? (
          <MdDelete
            style={{
              cursor: "pointer",
            }}
            color="red"
            onClick={() => {
              props.onDelete(props.cartItemId);
            }}
          />
        ) : (
          <button
            className={classes.cancel}
            onClick={() => {
              props.onCancel(props.orderId, props.giftId, props.quantity);
            }}
          >
            Cancel Order
          </button>
        )}
        {props?.place === "cart" && (
          <button
            className={classes.btn}
            onClick={() => props.onPlaceOrder(props.cartItemId)}
          >
            Add Theme
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
