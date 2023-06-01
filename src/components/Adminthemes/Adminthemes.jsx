import React, { Fragment } from "react";
import Displaytheme from "./Displaythemes";
import Addtheme from "./Addthemes";

import classes from "./Adminthemes.module.css";

export default function AdminProducts() {
  return (
    <Fragment>
      <div className={classes.content}>
        <Displaytheme />
        <Addtheme />
      </div>
    </Fragment>
  );
}
