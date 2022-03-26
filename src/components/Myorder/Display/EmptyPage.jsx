import React from "react";

import Card from "../../ModalOverlay/Card";
import Button from "../../ModalOverlay/Button";

import classes from "./EmptyPage.module.css";

const EmptyPage = (props) => {
  return (
    <Card clname={classes.width}>
      <p>{props.message}</p>
      {props.add!=="NIL"? <Button onClick={props.onClick}>{props.btnText}</Button>:""}
    </Card>
  );
};

export default EmptyPage;