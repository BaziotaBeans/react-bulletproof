import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";

import { AuthProvider } from "@/features/auth/context/auth-context";
import { QueryProvider } from "./providers/react-query";

import { router } from "@/routes/router";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
