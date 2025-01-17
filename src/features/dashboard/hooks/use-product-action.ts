import { useToast } from "@/hooks/use-toast";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/features/products/api/products";
import { Product, CreateProductData, UpdateProductData } from "@/features/products/types";
import { useState } from "react";

export function useProductActions() {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  const handleSubmit = async (data: CreateProductData | UpdateProductData) => {
    setIsSubmitting(true);
    try {
      if ("id" in data) {
        await updateProduct.mutateAsync(data as UpdateProductData);
        toast({ title: "Produto atualizado com sucesso" });
      } else {
        await createProduct.mutateAsync(data as CreateProductData);
        toast({ title: "Produto criado com sucesso" });
      }
      setSelectedProduct(null);
    } catch {
      toast({
        title: "Erro",
        description: "Algo deu errado",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingProductId(id);
    try {
      await deleteProduct.mutateAsync(id);
      toast({ title: "Produto excluído com sucesso" });
    } catch {
      toast({ title: "Error", description: "Algo deu errado", variant: "destructive" });
    } finally {
      setDeletingProductId(null);
    }
  };

  return {
    selectedProduct,
    setSelectedProduct,
    handleSubmit,
    handleDelete,
    isSubmitting,
    deletingProductId,
  };
}
