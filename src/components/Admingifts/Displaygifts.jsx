import React from "react";
import Editgifts from "./Editgifts";
import { MdDelete } from "react-icons/md";
import { useProductsCxt } from "../Assets/products-context";
import EmptyPage from "../Myorder/Display/EmptyPage";

const TableData = (props) => {
  return props.data.map((item) => (
    <tr key={item.giftId} style={{ backgroundColor: "white" }}>
      <td>
        <img
          style={{ height: "80px", width: "80px",objectFit:"cover"}}
          src={item.url}
          alt={item.productName}
        />
      </td>
      <td style={{ fontSize: "120%" }}>{item.productName}</td>
      <td style={{ fontSize: "120%" }}>${item.price}</td>
      <td style={{ fontSize: "120%" }}>{item.quantity}</td>
      <td>
        <Editgifts item={item} cou={item.giftId} />
      </td>
      <td>
        <MdDelete
          onClick={() => props.onDelete(item.giftId)}
          id={"deleteProduct" + item.giftId}
          style={{
            marginLeft: "30px",
            cursor: "pointer",
            marginRight: "20px",
            height: "25px",
            width: "25px",
          }}
          color="red"
        />
      </td>
    </tr>
  ));
};

export default function DisplayProducts() {
  const productsCxt = useProductsCxt();
  let element;
  const deleteProductHandler = (productId) => {
    productsCxt.productsDispatchFn({
      type: "DELETE_PRODUCT",
      value: productId,
    });
    setTimeout(() => {
      alert("Product deleted successfully");
    }, 300);
  };

  let tableBody = (
    <TableData
      data={productsCxt.productsList}
      onDelete={deleteProductHandler}
    />
  );
  if(tableBody.props.data.length>0){
    element=(
      <div
      className="table-responsive"
      style={{
        border: "none",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0, 0, 0, 0.25)",
        backgroundColor: "white",
      }}
    >
      <table
        className="table table-hover"
        style={{ verticalAlign: "middle" }}
      >
        <thead>
          <tr
            style={{
              fontSize: "130%",
              backgroundColor: "#0D6EFD",
              color: "white",
            }}
          >
            <th scope="col">Image</th>
            <th scope="col">Gifts Name</th>
            <th scope="col">Cost</th>
            <th scope="col">Quantity</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div> 
    );
  }
  else{
    element = <EmptyPage message="No Products Found" />;
  }
  return (
    <div
      className="container col-md-7 ms-3"
      style={{
        float: "left",
        fontFamily: "Montserrat, sans-serif ",
        textAlign: "center",
      }}
    >
     {element}
    </div>
  );
}