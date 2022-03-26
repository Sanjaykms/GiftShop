import React, { useState, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Display from "./Display/Display";
import CartItem from "./CartItem";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

import { useMyOrdersCxt } from "../Assets/myorders-context";
import EmptyPage from "./Display/EmptyPage";
import { useProductsCxt } from "../Assets/products-context";
import { useAuthCxt } from "../Assets/auth-context";

const MyOrder = () => {
  const navigate = useNavigate();
  const myordersCxt = useMyOrdersCxt();
  const productsCxt = useProductsCxt();
  const { productsList } = productsCxt;
  const authCxt = useAuthCxt();
  const [haveToEditProduct, setHaveToEditProduct] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const { orderItems } = myordersCxt;
  let element;

  const findTotalAmount = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const findProduct = (productId) => {
    return {
      ...productsList.find((item) => {
        return productId === item.giftId;
      }),
    };
  };
  const openEditOverlayHandler = (orderId) => {
    const tempProduct = {
      ...orderItems.find((item) => {
        return orderId === item.orderId;
      }),
    };
    const product = {
      ...productsList.find((item) => {
        return item.giftId === tempProduct.giftId;
      }),
    };
    setHaveToEditProduct(tempProduct);
    setImageUrl(product.url);
    navigate(`/MyOrders/${orderId}`);
  };

  const closeEditOverlayHandler = () => {
    navigate("/MyOrders");
  };

  const removeHandler = (orderId, giftId,quantity) => {
    myordersCxt.myordersDispatchFn({
      type: "CANCEL_ORDER",
      value: orderId,
    });
    const product = findProduct(giftId);
    product.quantity = String(Number(product.quantity) + quantity);
    productsCxt.productsDispatchFn({
      type: "EDIT_PRODUCT",
      value: product,
    });
    setTimeout(() => {
      alert("Your order canceled successfully :) ");
    }, 400);
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
      removeHandler( tempProduct.orderId,
        tempProduct.giftId,
        tempProduct.quantity);
      closeEditOverlayHandler();
    }
  };

  const saveHandler = () => {
    myordersCxt.myordersDispatchFn({
      type: "UPDATE_ORDER",
      value: haveToEditProduct,
    });
    closeEditOverlayHandler();
  };

  const items = orderItems.filter((item) => {
    return item.userId === authCxt.userInfo.userId;
  }).map((item, index) => {
    return (
      <div key={`product${index + 1}`}>
        <CartItem
          orderId={item.orderId}
          giftId={item.giftId}
          productName={item.productName}
          totalAmount={item.totalAmount}
          quantity={item.quantity}
          onOpen={openEditOverlayHandler}
          onCancel={removeHandler}
        />
        <hr />
      </div>
    );
  });

  const gotoCartHandler = () => {
    navigate("/Cart");
  };

  if (items.length > 0) {
    element = <Display items={items} />;
  } else {
    element = (
      <EmptyPage
        message="No Orders Found :("
        btnText="Go to Cart"
        onClick={gotoCartHandler}
        hasNeed={true}
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
              onIncrement={increceProductQuantity}
              onClose={closeEditOverlayHandler}
              onSave={saveHandler}
              imageUrl={imageUrl}
              onDecrement={decreceProductQuantity}
            />
          }
        />
      </Routes>
      {element}
    </Fragment>
  );
};

export default MyOrder;