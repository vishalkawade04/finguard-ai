import { Navigate, useLocation } from "react-router-dom";
import { getToken, isTokenExpired, logout } from "../utils/auth";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    if (token) {
      logout(false);
    }

    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;
