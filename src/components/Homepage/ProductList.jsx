import React from "react";

import ProductItem from "./ProductItem";

import classes from "./Giftlist.module.css";
import { useCartCxt } from "../Assets/cart-context";
import { useProductsCxt } from "../Assets/products-context";

function ProductList() {
  const cartCxt = useCartCxt();
  const productsCxt = useProductsCxt();

  const productsList = productsCxt.productsList.map((product, index) => {
    // console.log(product);
    return (
      <ProductItem
        key={'grid${index}'}
        id={'grid${index}'}
        product={product}
        onClick={cartCxt.cartDispatchFn}
      />
    );
  });

  return <div className={classes.container}>{productsList}</div>;
}

export default ProductList;