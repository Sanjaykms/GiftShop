import React, { useState, Fragment ,useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";

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
  const [orderID,setOrderID]=useState(0);
  let element;
  const findTotalAmount = (quantity, price,themePrice) => {
    return ((quantity * price)+(themePrice*quantity)).toFixed(2);
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
    setOrderID(tempProduct.quantity);
    setHaveToEditProduct(tempProduct);
    setImageUrl(product.url);
    navigate(`/MyOrders/${orderId}`);
  };

  const closeEditOverlayHandler = () => {
    navigate("/MyOrders");
  };

  const removeHandler = (orderId, giftId,quantity) => {
    if(prompt("Are you sure on cancelling the order?\n\nIf yes means type 'YES'")!=="YES"){
      return;
    }
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
    const exsistedProduct = {
      ...productsCxt.productsList.find((item) => {
        return tempProduct.giftId === item.giftId;
      }),
    };
      tempProduct.quantity += 1;
      tempProduct.totalAmount = findTotalAmount(
        tempProduct.quantity,
        tempProduct.price,
        parseFloat(tempProduct.themePrice)
      );
      setHaveToEditProduct(tempProduct); 
  };

  const decreceProductQuantity = () => {
    const tempProduct = { ...haveToEditProduct };
    if (tempProduct.quantity > 1) {
      tempProduct.quantity -= 1;
      tempProduct.totalAmount = findTotalAmount(
        tempProduct.quantity,
        tempProduct.price,
        parseFloat(tempProduct.themePrice)
      );
      setHaveToEditProduct(tempProduct);
    } else {
      removeHandler( tempProduct.orderId,
        tempProduct.giftId,
        orderID);
      closeEditOverlayHandler();
    }
  };

  const saveHandler = () => {
    const product = {
      ...productsList.find((item) => {
        return item.giftId === haveToEditProduct.giftId;
      }),
    };
    product.quantity=parseInt(product.quantity)+(orderID-haveToEditProduct.quantity);
    if(product.quantity<0){
      alert("Not more sufficient stocks are available :<")
      return;
    }
    myordersCxt.myordersDispatchFn({
      type: "UPDATE_ORDER",
      value: haveToEditProduct,
    });
    productsCxt.productsDispatchFn({
      type: "EDIT_PRODUCT",
      value: product,
    });
    alert(orderID+" "+haveToEditProduct.quantity+" "+product.quantity+"  last+>"+parseInt(product.quantity)+(orderID-haveToEditProduct.quantity));
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