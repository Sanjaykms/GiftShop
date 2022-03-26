import React,{Fragment} from "react";
// import { useNavigate } from "react-router-dom";
import classes from "./Giftitem.module.css";
import Button from "../ModalOverlay/Button";
import { useNavigate } from "react-router-dom";
function ProductItem(props) {
  const navigate = useNavigate();
  const { product } = props;

  const viewProductHandler = (productId) => {
    navigate(`/${productId}`);
  };
  return (
    <Fragment>
    <div id={props.id} className={classes.container}>
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
        <Button onClick={() => viewProductHandler(product.giftId)}>
          View Gift
        </Button>
      </div>
    </div>
  </Fragment>
  );
}

export default ProductItem;