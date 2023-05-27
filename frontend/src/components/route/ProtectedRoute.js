import React, { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {!loading &&
        (!isAuthenticated ? <Navigate to="/login" replace /> : children)}
    </Fragment>
  );
};

export default ProtectedRoute;
