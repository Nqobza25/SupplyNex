import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { currentUser, userData } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for required role if specified
  if (requiredRole && userData?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
