import { Role } from "../types";

type Resource = "users" | "products";
type Action = "read" | "create" | "update" | "delete";

const permissions: Record<Role, Record<Resource, Action[]>> = {
  admin: {
    users: ["read", "create", "update", "delete"],
    products: ["read", "create", "update", "delete"],
  },
  manager: {
    users: ["read"],
    products: ["read", "create", "update", "delete"],
  },
  user: {
    users: [],
    products: ["read"],
  },
};

export function can(role: Role, action: Action, resource: Resource): boolean {
  return permissions[role]?.[resource]?.includes(action) ?? false;
}
