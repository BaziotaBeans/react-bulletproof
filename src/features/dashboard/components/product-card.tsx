import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { CreateProductData, Product, UpdateProductData } from "@/features/products/types";
import { ProductForm } from "./product-form";
import { can } from "@/features/auth/utils/authorization";
import { Role } from "@/features/auth/types";

interface ProductCardProps {
  product: Product;
  userRole: Role;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  deletingProductId: string | null;
  isSubmitting: boolean;
  handleSubmit: (data: CreateProductData | UpdateProductData) => Promise<void>;
}

export function ProductCard({
  product,
  userRole,
  onEdit,
  onDelete,
  deletingProductId,
  isSubmitting,
  handleSubmit,
}: ProductCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const isDeleting = deletingProductId === product.id;

  const handleEditClick = () => {
    onEdit(product); // ✅ Seta o produto correto para edição
    setIsEditDialogOpen(true);
  };

  return (
    <Card className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold">${product.price}</span>
        <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
      </div>

      {can(userRole, "update", "products") && (
        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => setIsEditDialogOpen(true)}
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm
                onSubmit={(data: CreateProductData) => {
                  // Crie um objeto do tipo UpdateProductData
                  const updateData: UpdateProductData = {
                    ...data,
                    id: product.id,
                  };
                  handleSubmit(updateData);
                  setIsEditDialogOpen(false);
                }}
                initialData={product} // Passa os dados do produto selecionado
                isSubmitting={isSubmitting}
              />
            </DialogContent>
          </Dialog>

          {can(userRole, "delete", "products") && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(product.id)}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}
