import React from "react";
// import { useNavigate } from "react-router-dom";
import classes from "./Giftitem.module.css";
import Button from "../ModalOverlay/Button";

import { useCartCxt } from "../Assets/cart-context";

function ProductItem(props) {
  // const navigate = useNavigate();
  const cartCxt = useCartCxt();
  const { product } = props;

  const addToCartHandler = () => {
    if (cartCxt.cartItems.length < 5) {
      const newProduct = { ...product };
      newProduct.quantity = 1;
      props.onClick({ type: "ADD_TO_CART", value: newProduct });
    } else {
      alert("Cant't add to cart. Your Cart is full :(");
    }
  };

  return (
    <div id={props.id} className={classes.container} title="">
      <div>
        <img
          className={classes.img}
          src={product.url}
          alt={product.productName}
        />
      </div>
      <div className={classes.description}>
        <h3>{product.productName}</h3>
        <h3>${product.price}</h3>
      </div>
      <div className={classes.footer}>
        <Button onClick={addToCartHandler}>Add to Cart</Button>
      </div>
    </div>
  );
}

export default ProductItem;