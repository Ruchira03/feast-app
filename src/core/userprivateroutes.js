import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isauth } from "./authcheck";

const UserPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isauth() ? <Component {...props} /> : <Redirect to="/user/signup" />
      }
    />
  );
};

export default UserPrivateRoute;
