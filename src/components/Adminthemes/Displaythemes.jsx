import React, { useState } from "react";
import Editthemes from "./Editthemes";
import { MdDelete } from "react-icons/md";
import { useThemeCxt } from "../Assets/themes-context";
import classes from "./Displaythemes.module.css";
import Card from "../ModalOverlay/Card";
const TableData = (props) => {
  return props.data.map((item) => (
    <tr key={item.id} style={{ backgroundColor: "white" }}>
      <td>{item.themeName}</td>
      <td>${item.price}</td>
      <td>{item.themeDesc}</td>
      <td>
        <Editthemes item={item} cou={item.id} />
      </td>
      <td>
        <MdDelete
          onClick={() => props.onDelete(item.id)}
          id={"deleteProduct" + item.ud}
          className={classes.delete}
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
  const themeList = themeCxt.themeList.filter((item) => {
    return item.themeName.includes(enteredValue);
  });
  const deleteThemeHandler = (productId) => {
    var condit = prompt("Delete?\nThen type 'YES'");
    if (condit === "YES") {
      themeCxt.themeDispatchFn({
        type: "DELETE_PRODUCT",
        value: productId,
      });
    }
  };
  let tableBody = <TableData data={themeList} onDelete={deleteThemeHandler} />;
  return (
    <div
      className=""
      style={{
        fontFamily: "Montserrat, sans-serif ",
        textAlign: "center",
      }}
    >
      <div
        className={classes.innerDiv}
        // style={{
        //   padding: "10px",
        //   margin: "50px auto",
        //   boxShadow:
        //     "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        //   borderRadius: "10px",
        //   width: "50%",
        // }}
      >
        <input
          type="text"
          placeholder="Type here to seach theme"
          onChange={changeHandler}
        />
      </div>
      <div className={"table-responsive " + classes.tableRe}>
        <table
          className="table table-hover"
          style={{ verticalAlign: "middle" }}
        >
          <thead>
            <tr>
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
