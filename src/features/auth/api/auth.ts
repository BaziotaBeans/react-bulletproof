import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../validators/auth";
import { AuthResponse, MOCK_USERS } from "../types";

const mockLogin = async (credentials: LoginSchema): Promise<AuthResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS[credentials.email];
  if (user && credentials.password === "password123") {
    return user;
  }
  throw new Error("Credenciais inválidas");
};

export const useLogin = () => {
  return useMutation({
    mutationFn: mockLogin,
  });
};
