import React, { useState, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import Display from "./Display/Display";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import EmptyPage from "./Display/EmptyPage";

import { useCartCxt } from "../Assets/cart-context";
import { useMyOrdersCxt } from "../Assets/myorders-context";
import { useProductsCxt } from "../Assets/products-context";
import { useAuthCxt } from "../Assets/auth-context";
import Placeorder from '../Placeorder/Placeorder';
import useGenerateId from "../../Hooks/generate-id";
const Cart = () => {
  const [ordeId,setOrderId]=useState("");
  const [priceVal,setPriceVal]=useState("");
  const [haveToEditProduct, setHaveToEditProduct] = useState({});
  const cartCxt = useCartCxt();
  const authCxt = useAuthCxt();
  const myordersCxt = useMyOrdersCxt();
  const navigate = useNavigate();
  const productsCxt = useProductsCxt();
  const generateId = useGenerateId();

  let element;

  const findTotalAmount = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const findProduct = (cartItemId) => {
    return {
      ...cartCxt.cartItems.find((item) => {
        return cartItemId === item.cartItemId;
      }),
    };
  };

  const removeHandler = (cartItemId) => {
    cartCxt.cartDispatchFn({
      type: "REMOVE_FROM_CART",
      value: cartItemId,
    });
  };

  const openEditOverlayHandler = (cartItemId) => {
    const product = findProduct(cartItemId);
    setHaveToEditProduct(product);
    navigate(`/Cart/${cartItemId}`);
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
      removeHandler(haveToEditProduct.cartItemId);
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
    
    const product = findProduct(ordeId)
    const exsistedProduct = {
      ...productsCxt.productsList.find((item) => {
        return product.giftId === item.giftId;
      }),
    };
    const orderedProduct = {
      orderId: generateId("ORDER"),
      userId: authCxt.userInfo.userId,
      giftId: product.giftId,
      productName: product.productName,
      quantity: product.quantity,
      price: product.price,
      totalAmount: product.totalAmount,
      url:product.url,
      status: "Order placed",
    };
    const orderedProduct1=orderedProduct;
    orderedProduct1.totalAmount=parseFloat(orderedProduct1.totalAmount)+parseFloat(priceVal);
    // console.log(product.id);
    // console.log(exsistedProduct);
    // console.log(exsistedProduct.quantity, product.quantity);
    if (exsistedProduct.quantity >= product.quantity) {
      myordersCxt.myordersDispatchFn({ type: "PLACE_ORDER", value:orderedProduct1 });
      exsistedProduct.quantity =
        exsistedProduct.quantity - orderedProduct.quantity + "";
      productsCxt.productsDispatchFn({ type: "EDIT_PRODUCT", value: exsistedProduct });
      removeHandler(ordeId);
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
          giftId={cartItem.giftId}
          productName={cartItem.productName}
          totalAmount={cartItem.totalAmount}
          quantity={cartItem.quantity}
          place="cart"
          cartItemId={cartItem.cartItemId}
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
        btnText="Add Gifts"
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