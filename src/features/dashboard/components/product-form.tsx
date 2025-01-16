import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, CreateProductData } from "@/features/products/types";
import { FormEvent } from "react";
import { Loader2 } from "lucide-react";

interface ProductFormProps {
  onSubmit: (data: CreateProductData) => void;
  initialData?: Product | null;
  isSubmitting: boolean;
}

export function ProductForm({ onSubmit, initialData, isSubmitting }: ProductFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: CreateProductData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      image: formData.get("image") as string,
    };
    onSubmit(data);
  };

  const fields: (keyof Product)[] = ["name", "description", "price", "stock", "image"];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(
        (
          field: keyof Product, // Forçando a tipagem correta aqui
        ) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              id={field}
              name={field}
              type={field === "price" || field === "stock" ? "number" : "text"}
              step={field === "price" ? "0.01" : undefined}
              defaultValue={initialData ? String(initialData[field] ?? "") : ""} // Acesso seguro
              required
            />
          </div>
        ),
      )}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : initialData ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </Button>
    </form>
  );
}
