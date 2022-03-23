import React ,{useState}from "react";
import Editthemes from "./Editthemes";
import { MdDelete } from "react-icons/md";
import { useThemeCxt } from "../Assets/themes-context";
import Card from "../ModalOverlay/Card";
const TableData = (props) => {
  return props.data.map((item) => (
    <tr key={item.id} style={{ backgroundColor: "white" }}>
      <td style={{ fontSize: "120%" }}>{item.themeName}</td>
      <td style={{ fontSize: "120%" }}>${item.price}</td>
      <td style={{ fontSize: "120%" }}>{item.themeDesc}</td>
      <td>
        <Editthemes item={item} cou={item.id} />
      </td>
      <td>
        <MdDelete
          onClick={() => props.onDelete(item.id)}
          id={"deleteProduct" + item.ud}
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

export default function DisplayTheme() {
  const themeCxt = useThemeCxt();
  const [enteredValue, setEnteredValue] = useState("");
  const changeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const themeList = themeCxt.themeList
    .filter((item) => {
      return item.themeName.includes(enteredValue);
  });
  const deleteThemeHandler = (productId) => {
    themeCxt.themeDispatchFn({
      type: "DELETE_PRODUCT",
      value: productId,
    });
  };
  let tableBody = (
    <TableData
      data={themeList}
      onDelete={deleteThemeHandler}
    />
  );
  return (
    <div
      className="container col-md-7 ms-3"
      style={{
        float: "left",
        fontFamily: "Montserrat, sans-serif ",
        textAlign: "center",
      }}
    >
      <div style={{padding:"10px",margin:"50px auto",boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",borderRadius:"10px",width:"50%"}}>
        <input
          type="text"
          placeholder="Type here to seach theme" style={{border: "2px solid grey",
            paddingLeft: "20px",
            width: "100%"}}
          onChange={changeHandler}
        />
      </div>  
      <div
        className="table-responsive"
        style={{
          border: "none",
          borderRadius: "15px",
          overflow: "hidde",
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
              <th scope="col">Theme Name</th>
              <th scope="col">Cost</th>
              <th scope="col">Theme Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
}