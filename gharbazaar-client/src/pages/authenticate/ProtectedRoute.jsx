import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Check authentication
  const isAuthenticated = !!user;

  // User not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Role authorization check
  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/" replace />;
  }

  // Allow access
  return <Outlet />;
};

export default ProtectedRoute;