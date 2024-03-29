import React, { Fragment } from "react";
import classes from "./Review.module.css";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Review = (props) => {
  return (
    <Fragment>
      <div className={classes.cont}>
      <p className={classes.name}>{props.userName}</p>
      <p className={classes.comment}>{props.comment}</p>
      {props.isNeed && (
        <MdModeEdit
          color="blue"
          className={`${classes.icon} ${classes.editIcon}`}
          onClick={() => props.onEdit(props.reviewItem)}
        />
      )}
      {props.isNeed && (
        <MdDelete
          color="red"
          className={`${classes.icon} ${classes.deleteIcon}`}
          onClick={() => props.onDelete(props.reviewId)}
        />
      )}
      </div>
    </Fragment>
  );
};

export default Review;