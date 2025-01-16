import { createBrowserRouter, Navigate } from "react-router-dom";

import { PrivateRoute } from "@/features/auth/routes/private-route";
import { PublicRoute } from "@/features/auth/routes/public-route";
import { Login } from "@/features/auth/components/login";
import { Dashboard } from "@/features/dashboard/components/dashboard";
import { NotFound } from "@/components/not-found";
import { useAuth } from "@/features/auth/hooks/use-auth";

function RootRedirect() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRedirect />, // Verifica se está logado e redireciona
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
