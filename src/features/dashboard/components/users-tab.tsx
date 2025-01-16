import { Role } from "@/features/auth/types";
import { useUsers } from "@/features/users/api/users";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UsersTabProps {
  userRole: Role;
}

export function UsersTab({ userRole }: UsersTabProps) {
  const { data: users, isLoading } = useUsers();

  if (userRole !== "admin") {
    return <div>You don't have permission to view this content.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users?.map((user) => (
        <Card key={user.id} className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-sm text-muted-foreground capitalize">Role: {user.role}</p>
              <p className="text-sm text-muted-foreground">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
