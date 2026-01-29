/**
 * Purpose: Protected Route Wrapper.
 * Checks authentication status and redirects to login if unauthenticated.
 */
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) {
        // Redirect to login while saving the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
