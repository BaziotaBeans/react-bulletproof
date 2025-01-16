export type Role = "admin" | "manager" | "user";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const MOCK_USERS: Record<string, AuthResponse> = {
  "admin@example.com": {
    token: "admin-mock-token",
    user: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
      createdAt: "2024-01-01",
    },
  },
  "manager@example.com": {
    token: "manager-mock-token",
    user: {
      id: "2",
      email: "manager@example.com",
      name: "Manager User",
      role: "manager",
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=60",
      createdAt: "2024-02-01",
    },
  },
  "user@example.com": {
    token: "user-mock-token",
    user: {
      id: "3",
      email: "user@example.com",
      name: "Regular User",
      role: "user",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
      createdAt: "2024-03-01",
    },
  },
};
