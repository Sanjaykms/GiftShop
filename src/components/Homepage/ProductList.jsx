import React ,{Fragment} from "react";

import ProductItem from "./ProductItem";

import classes from "./Giftlist.module.css";
import { useCartCxt } from "../Assets/cart-context";
import { useProductsCxt } from "../Assets/products-context";
import EmptyPage from "../Myorder/Display/EmptyPage";
 function ProductList() {
  const cartCxt = useCartCxt();
  const productsCxt = useProductsCxt();
  let element;
  let clname;
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
  if (productsList.length > 0) {
    element = productsList;
    clname = classes.container;
  } else {
    clname = "";
    element = <EmptyPage message="No Products Found" />;
  }
  return (<Fragment>
  <div className={clname}>{element}</div>
</Fragment>);
}

export default ProductList;