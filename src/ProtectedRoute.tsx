import React, { ElementType, useMemo } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: ElementType;
  allowedRoles: string[];
  userRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  allowedRoles,
  userRole,
  ...rest
}) => {
  console.log("Protected Route Role: ", userRole);
  console.log("Allowed Roles: ", allowedRoles);

  const isAuthorized = useMemo(
    () => allowedRoles.includes(userRole) || allowedRoles.includes("*"),
    [allowedRoles, userRole]
  );

  console.log("isAuthorized: ", isAuthorized);

  return isAuthorized ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
