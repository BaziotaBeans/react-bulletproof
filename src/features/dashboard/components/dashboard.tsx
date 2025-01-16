import { useNavigate } from "react-router-dom";
import { BarChart3, LogOut, User, Package, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { can } from "@/features/auth/utils/authorization";
import { ProductsTab } from "./products-tab";
import { UsersTab } from "./users-tab";
import { ModeToggle } from "@/components/mode-toggle";

const mockStats = {
  totalSales: "₿ 45,231.89",
  newCustomers: "2,345",
  activeUsers: "12,234",
  revenue: "₿ 12,234.89",
};

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 container mx-auto">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vendas totais</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalSales}</div>
              <p className="text-xs text-muted-foreground">+20,1% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos clientes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.newCustomers}</div>
              <p className="text-xs text-muted-foreground">+180,1% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários ativos</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">+19% em relação ao mês passado</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.revenue}</div>
              <p className="text-xs text-muted-foreground">+201 desde a última hora</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Produtos
            </TabsTrigger>
            {can(user.role, "read", "users") && (
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Usuários
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="products">
            <ProductsTab userRole={user.role} />
          </TabsContent>
          {can(user.role, "read", "users") && (
            <TabsContent value="users">
              <UsersTab userRole={user.role} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
