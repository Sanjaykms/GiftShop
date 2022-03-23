import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ReactDom from "react-dom";
import { Fragment } from "react";
import { useThemeCxt } from "../Assets/themes-context";
import { useState } from "react";
export const Backdrop = (props) => {
  return <div onClick={props.onClose} style={{backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "100"}}></div>;
};
const OrderOverlay=(props)=>{
  const themeCxt=useThemeCxt();
  const {productVal}=props;
  const [addTheme,setAddTheme]=useState(0);
    return(
        <div class=" text-center " style={{zIndex:"999",background:"white",padding:"30px",position:"fixed",top:"50%",left:"50%",width:"50%",transform:"translate(-50%,-50%)"}}>
            <form class="container-fluid mb-5" style={{marginTop:"50px"}} onSubmit={(e)=>{e.preventDefault();props.orderHandler()}}>
            <div class="row " >
              <h3 style={{marginBottom:"30px",color:"#0D6EFD"}}>ENTER DETAILS</h3>
            <div class="col-6 mb-5">

            <div id="orderName" class="input-group mb-3">
              <input type="text" class="form-control" id="orderName" placeholder="Enter your name" required></input>
            </div>

            <div id="orderDate" class="input-group mb-3">
              <input placeholder="Enter the order date" type="date" class="form-control" id="orderDate" required></input>
            </div>

            <div id="orderAddress" class="input-group mb-3">
              <input type="address" class="form-control" id="orderAddress" placeholder="Enter your Address" required></input>
            </div>

            <div id="orderPhoneNo" class="input-group mb-3">
              <input type="mobilenumber" class="form-control" id="orderPhoneNo" placeholder="Enter your phone number"></input>
            </div>

            <div id="orderEmailId" class="input-group mb-3">
              <input type="email" class="form-control" id="orderEmailId" placeholder="Enter your email id" required></input>
            </div>

            </div>

            <div class="col-6">


            <div id="orderPrice" class="input-group mb-3">
              <input type="text" class="form-control" id="orderPrice" value={"$"+(parseFloat(productVal.totalAmount)+parseFloat(addTheme))} disabled></input>
            </div>

            <div id="giftModel" class="input-group mb-3">
              <input type="text" class="form-control" id="giftModel" value={productVal.productName} disabled></input>
            </div>

            <div id="orderDescription" class="input-group mb-3">
              <input type="text" class="form-control" id="orderDescription" placeholder="Order description"></input>
            </div>

            <div class="input-group">
              <select class="form-select" id="orderCategory" required onChange={(e)=>{
                props.onThemeHandler(e.target.value);
                setAddTheme(e.target.value);
              }}>
                <option selected hidden>Select theme</option>
                {themeCxt.themeList.map((item,index)=>{
                  return (
                    <option value={item.price} key={index}>{item.themeName} ${item.price}</option>
                  )
                })}
                <option value="0">No Theme</option>
              </select>
              <label class="input-group-text" for="inputGroupSelect02">Options</label>
            </div>
            <br></br>
            <br></br>
            <div class=" position-relative" id="placeOrder">
            <button type="submit" class="btn btn-primary position-absolute bottom-0 end-0 ">Place order</button>
            </div>
            <br></br>
            <br></br>
            <div class=" position-relative" id="placeOrder">
            <button type="button" class="btn btn-primary position-absolute bottom-0 end-0 " onClick={props.onClose}>Close</button>
            </div>
            </div>
            </div>
</form>
</div>

    );
}
const Placeorder=(props)=>{
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onClose={props.onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <OrderOverlay
          productVal={props.productToBeShown}
          orderHandler={props.placeorder}
          onClose={props.onClose}
          onThemeHandler={props.onThemeChange}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};
export default Placeorder;