import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
