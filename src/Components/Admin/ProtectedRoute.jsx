import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;
