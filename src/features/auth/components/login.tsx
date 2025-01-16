import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "../api/auth";
import { LoginSchema, loginSchema } from "../validators/auth";
import { useAuth } from "../hooks/use-auth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        login(response.token, response.user);
        navigate("/dashboard");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "E-mail ou senha inválida",
        });
      },
    });
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input type="password" placeholder="Senha" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Carregando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
