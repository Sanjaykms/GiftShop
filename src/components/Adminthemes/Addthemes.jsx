import React, { useState } from "react";
import Button from "../ModalOverlay/Button";
import { useThemeCxt } from "../Assets/themes-context";
import useGenerateId from "../../Hooks/generate-id";
import classes from "./Addthemes.module.css";
export default function AddItem() {
  const themeCxt = useThemeCxt();
  const [themeName, setThemeName] = useState("");
  const [cost, setCost] = useState("");
  const [themeDesc, setThemeDesc] = useState("");
  const generateId = useGenerateId();
  const submit = (e) => {
    e.preventDefault();
    if (themeName !== "" && cost !== "" && themeDesc !== "") {
      const newProduct = {
        id: generateId("theme"),
        themeName: themeName,
        price: cost,
        themeDesc: themeDesc,
      };
      themeCxt.themeDispatchFn({ type: "ADD_PRODUCT", value: newProduct });
      setThemeName("");
      setCost("");
      setThemeDesc("");
    } else {
      alert("Enter all the details");
    }
  };

  return (
    <div
      className={classes.container}
      id="AddTheme"
      // style={{
      //   padding: "5px",
      //   borderRadius: "15px",
      //   overflow: "hidden",
      //   backgroundColor: "#0D6EFD",
      // }}
    >
      <form onSubmit={submit}>
        <header
          className={classes.header}
          // style={{
          //   height: "60px",
          //   textAlign: "center",
          //   color: "white",
          //   paddingTop: "30px",
          // }}
        >
          <h2>Add Theme</h2>
        </header>
        <div className="my-3">
          <input
            className="form-control"
            id="enterThemeName"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={themeName}
            placeholder="enter the theme name"
            onChange={(e) => setThemeName(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            className="form-control"
            id="enterThemePrice"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={cost}
            placeholder="enter the theme price"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="my-3">
          <input
            className="form-control"
            id="enterThemeDescription"
            style={{
              width: "98%",
              marginTop: "1%",
              paddingTop: "2%",
              paddingBottom: "2%",
            }}
            type="text"
            value={themeDesc}
            placeholder="enter the product theme description"
            onChange={(e) => setThemeDesc(e.target.value)}
          />
        </div>
        <div className="my-3" style={{ textAlign: "center" }}>
          <Button id="add">Add</Button>
        </div>
      </form>
    </div>
  );
}
