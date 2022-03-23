import React from "react";

import { Outlet, Navigate } from "react-router-dom";

const RequireAuth = (props) => {
  let content;

  if (props.role) {
    content = <Outlet />;
  } else {
    content = <Navigate to="/Login" />;
  }

  return content;
};

export default RequireAuth;