import React, { useState } from "react";
import Button from "../ModalOverlay/Button";
import { useThemeCxt } from "../Assets/themes-context";

export default function AddItem() {
  const themeCxt = useThemeCxt();
  const [themeName, setThemeName] = useState("");
  const [cost, setCost] = useState("");
  const [themeDesc, setThemeDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const newProduct = {
      themeName: themeName,
      price: cost,
      themeDesc: themeDesc,
    };
    themeCxt.themeDispatchFn({ type: "ADD_PRODUCT", value: newProduct });
    setThemeName("");
    setCost("");
    setThemeDesc("");
  };

  return (
    <div
      className="container col-md-4"
      id="AddTheme"
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
          <h2>Add Theme</h2>
        </header>
        <div className="my-5">
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
        <div className="my-5">
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
        <div className="my-5">
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
        <div className="my-5" style={{ textAlign: "center" }}>
          <Button id="add">Add</Button>
        </div>
      </form>
    </div>
  );
}