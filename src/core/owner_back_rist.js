import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isauth } from "./authcheck";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isauth() && restricted ? (
          <Redirect to="/ownerhomepage" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
