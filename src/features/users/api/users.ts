import { useQuery } from "@tanstack/react-query";
import { User, MOCK_USERS } from "@/features/auth/types";

const getUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Object.values(MOCK_USERS).map(({ user }) => user);
};

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
