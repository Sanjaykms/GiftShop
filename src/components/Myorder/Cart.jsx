import React, { useState, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import Display from "./Display/Display";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import EmptyPage from "./Display/EmptyPage";

import { useCartCxt } from "../Assets/cart-context";
import { useMyOrdersCxt } from "../Assets/myorders-context";
import { useProductsCxt } from "../Assets/products-context";
import Placeorder from '../Placeorder/Placeorder';

const Cart = () => {
  const [orderId,setOrderId]=useState("");
  const [priceVal,setPriceVal]=useState("");
  const [haveToEditProduct, setHaveToEditProduct] = useState({});
  const cartCxt = useCartCxt();
  const myordersCxt = useMyOrdersCxt();
  const navigate = useNavigate();
  const productsCxt = useProductsCxt();

  let element;

  const findTotalAmount = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const findProduct = (productId) => {
    return {
      ...cartCxt.cartItems.find((item) => {
        return productId === item.id;
      }),
    };
  };

  const removeHandler = (productId) => {
    cartCxt.cartDispatchFn({
      type: "REMOVE_FROM_CART",
      value: productId,
    });
  };

  const openEditOverlayHandler = (productId) => {
    const product = findProduct(productId);
    setHaveToEditProduct(product);
    navigate(`/Cart/${productId}`);
  };

  const increceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    tempProduct.quantity += 1;
    tempProduct.totalAmount = findTotalAmount(
      tempProduct.quantity,
      tempProduct.price
    );
    setHaveToEditProduct(tempProduct);
  };

  const decreceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    if (tempProduct.quantity > 1) {
      tempProduct.quantity -= 1;
      tempProduct.totalAmount = findTotalAmount(
        tempProduct.quantity,
        tempProduct.price
      );
      setHaveToEditProduct(tempProduct);
    } else {
      removeHandler(haveToEditProduct.id);
      closeEditOverlayHandler();
    }
  };

  const saveHandler = () => {
    cartCxt.cartDispatchFn({
      type: "SAVE_EDITED_PRODUCT",
      value: haveToEditProduct,
    });
    closeEditOverlayHandler();
  };

  const closeEditOverlayHandler = () => {
    navigate("/Cart");
  };
  const themePrice=(val)=>{
    setPriceVal(val);
  }
  const placeOrderHandler = () => {
    
    const product = findProduct(orderId);
    const product1=product;
    product1.totalAmount=parseFloat(product1.totalAmount)+parseFloat(priceVal);
    const exsistedProduct = {
      ...productsCxt.productsList.find((item) => {
        return product.id === item.id;
      }),
    };
    
    // console.log(product.id);
    // console.log(exsistedProduct);
    // console.log(exsistedProduct.quantity, product.quantity);
    if (exsistedProduct.quantity >= product.quantity) {
      myordersCxt.myordersDispatchFn({ type: "PLACE_ORDER", value: product1 });
      productsCxt.productsDispatchFn({ type: "PLACE_ORDER", value: product });
      removeHandler(orderId);
      setTimeout(() => {
        alert("Your order placed successfully :)");
      }, 400);
      closeEditOverlayHandler();
    } else {
      alert("Not sufficient stocks available :(");
    }
  };
  const gotoPlaceOrder=(oID)=>{
    setOrderId(oID);
    const product1 = findProduct(oID);
    setHaveToEditProduct(product1);
    navigate("Placeorder");
  }
  const items = cartCxt.cartItems.map((cartItem, index) => {
    return (
      <div key={`product${index + 1}`}>
        <CartItem
          id={cartItem.id}
          productName={cartItem.productName}
          totalAmount={cartItem.totalAmount}
          quantity={cartItem.quantity}
          place="cart"
          onOpen={openEditOverlayHandler}
          onDelete={removeHandler}
          onPlaceOrder={gotoPlaceOrder}
        />
        <hr key={index + 1} />
      </div>
    );
  });
  const goToProductsPageHandler = () => {
    navigate("/Homepage");
  };

  if (cartCxt.cartItems.length > 0) {
    element = <Display items={items} />;
  } else {
    element = (
      <EmptyPage
        message="Your Cart is Empty :("
        btnText="Add Products"
        onClick={goToProductsPageHandler}
      />
    );
  }

  return (
    <Fragment>
      <Routes>
        <Route
          path=":productId"
          element={
            <ModalOverlay
              productToBeShown={haveToEditProduct}
              onClose={closeEditOverlayHandler}
              onIncrement={increceProductQuantity}
              onDecrement={decreceProductQuantity}
              onSave={saveHandler}
            />
          }
        />
        <Route path="Placeorder" element={
        <Placeorder 
        productToBeShown={haveToEditProduct}
        placeorder={placeOrderHandler}
        onClose={closeEditOverlayHandler}
        onThemeChange={themePrice}/>
        }
        />
      </Routes>
      {element}
    </Fragment>
  );
};

export default Cart;