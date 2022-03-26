import React, { useState } from "react";
import Button from "../ModalOverlay/Button";
import { useProductsCxt } from "../Assets/products-context";
import useGenerateId from "../../Hooks/generate-id";
export default function AddItem() {
  const productsCxt = useProductsCxt();
  const generateId = useGenerateId();
  const [image, setImage] = useState("");
  const [productName, setProductName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [giftDetails, setGiftDetails] = useState("");
  const submit = (e) => {
     e.preventDefault();
    if (
      image !== "" &&
      productName !== "" &&
      cost !== "" &&
      quantity !== "" &&
      giftDetails !== ""
    ) {
      const newProduct = {
        giftId: generateId("P"),
        url: image,
        productName: productName,
        price: cost,
        giftDetails:giftDetails,
        quantity: quantity,
      };
      productsCxt.productsDispatchFn({ type: "ADD_PRODUCT", value: newProduct });

      setImage("");
      setProductName("");
      setCost("");
      setQuantity("");
      setGiftDetails("");
    } else {
      alert("Please Enter all details");
    }
  };

  return (
    <div
      className="container col-md-4"
      id="AddItem"
      style={{
        float: "right",
        marginRight: "3%",
        marginTop: "-30px",
        borderRadius: "15px",
        overflow: "hidden",
        backgroundColor: "#0D6EFD",
      }}
    >
      <form onSubmit={submit}>
        <header
          style={{
            height: "60px",
            textAlign: "center",
            color: "white",
            paddingTop: "30px",
          }}
        >
          <h2>Add Gifts</h2>
        </header>
        <div className="my-5">
          <input
            className="form-control"
            id="enterProductName"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={productName}
            placeholder="enter the gift name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            className="form-control"
            id="enterProductPrice"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={cost}
            placeholder="enter the gift price"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            className="form-control"
            id="enterProductImageUrl"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={image}
            placeholder="enter the gift image url"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            className="form-control"
            id="enterProductQuantity"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={quantity}
            placeholder="enter the gift quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            className="form-control"
            id="enterProductQuantity"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={giftDetails}
            placeholder="enter the gift Gift Details"
            onChange={(e) => setGiftDetails(e.target.value)}
          />
        </div>
        <div className="my-5" style={{ textAlign: "center" }}>
          <Button id="addProductButton">Add</Button>
        </div>
      </form>
    </div>
  );
}