import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useProducts } from "@/features/products/api/products";
import { Role } from "@/features/auth/types";
import { can } from "@/features/auth/utils/authorization";
import { useProductActions } from "../hooks/use-product-action";
import { ProductCard } from "./product-card";
import { ProductForm } from "./product-form";

interface ProductsTabProps {
  userRole: Role;
}

export function ProductsTab({ userRole }: ProductsTabProps) {
  const { data: products, isLoading } = useProducts();
  const { setSelectedProduct, handleSubmit, handleDelete, isSubmitting, deletingProductId } =
    useProductActions();

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div className="space-y-4">
      {can(userRole, "create", "products") && (
        <Dialog onOpenChange={() => setSelectedProduct(null)}>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Adicionar produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar novo produto</DialogTitle>
            </DialogHeader>
            <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            userRole={userRole}
            onEdit={setSelectedProduct}
            onDelete={handleDelete}
            deletingProductId={deletingProductId}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit} // Adicione esta linha
          />
        ))}
      </div>
    </div>
  );
}
