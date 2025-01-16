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
        toast({ title: "Product updated successfully" });
      } else {
        await createProduct.mutateAsync(data as CreateProductData);
        toast({ title: "Product created successfully" });
      }
      setSelectedProduct(null);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
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
      toast({ title: "Product deleted successfully" });
    } catch {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
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
