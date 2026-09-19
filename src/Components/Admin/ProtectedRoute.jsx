import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldAlert } from 'lucide-react';
import SEO from '../SEO';

const ProtectedRoute = ({ children, allowedPositions = [], isMasterAdminOnly = false, isSaaOnly = false, isFinanceOnly = false }) => {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const userPosition = (admin.position || 'GBM').toUpperCase();
  const userRoles = admin.roles || ['MEMBER'];

  // Master Admin Override
  const isMaster = userPosition === 'PRESIDENT' || userRoles.includes('MASTER_ADMIN');

  let hasAccess = false;

  if (isMaster) {
    hasAccess = true;
  } else if (isMasterAdminOnly) {
    hasAccess = false; // Already checked isMaster above
  } else if (isSaaOnly) {
    hasAccess = userPosition === 'SAA' || userRoles.includes('SAA');
  } else if (isFinanceOnly) {
    hasAccess = userPosition === 'CPF' || userRoles.includes('FINANCE');
  } else if (userPosition === 'SECRETARY' || userRoles.includes('SECRETARY')) {
    hasAccess = true; // Secretary has high executive access
  } else if (allowedPositions.length > 0) {
    hasAccess = allowedPositions.some(pos => pos.toUpperCase() === userPosition || userRoles.includes(pos.toUpperCase()));
  } else {
    // If no specific positions required and not a special route, grant access (fallback for basic admin routes)
    hasAccess = true;
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <SEO title="Access Denied" />
        <div className="bg-danger/10 p-6 rounded-full mb-6">
          <ShieldAlert className="text-danger w-16 h-16" />
        </div>
        <h1 className="text-4xl font-black text-foreground mb-4">Access Denied</h1>
        <p className="text-foreground/60 max-w-md mb-8">
          You do not have the required permissions to view this page. Your current role is <strong>{admin.position || 'GBM'}</strong>.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-foreground font-semibold rounded-xl transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
