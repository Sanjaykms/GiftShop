import React, { Fragment } from "react";
import Displaygifts from "./Displaygifts";
import Addgifts from "./Addgifts";

import classes from "./Admingifts.module.css";

export default function AdminProducts() {
  return (
    <Fragment>
      <div className={classes.content}>
        <Displaygifts />
        <br />
        <Addgifts />
      </div>
    </Fragment>
  );
}