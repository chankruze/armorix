import { Navigate, Outlet } from "react-router";

interface RequireAuthProps {
  redirectTo: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ redirectTo }) => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
