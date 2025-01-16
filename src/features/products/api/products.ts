import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, CreateProductData, UpdateProductData } from "../types";

// Mock data
let MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1299.99,
    stock: 50,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=60",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 899.99,
    stock: 100,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=60",
    createdAt: "2024-02-15",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    description: "Premium noise-canceling headphones",
    price: 299.99,
    stock: 75,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60",
    createdAt: "2024-03-15",
  },
];

// Simulated API calls
const getProducts = async (): Promise<Product[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return MOCK_PRODUCTS;
};

const createProduct = async (data: CreateProductData): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const newProduct: Product = {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    createdAt: new Date().toISOString(),
  };
  MOCK_PRODUCTS = [...MOCK_PRODUCTS, newProduct];
  return newProduct;
};

const updateProduct = async (updatedProduct: UpdateProductData): Promise<Product> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const index = MOCK_PRODUCTS.findIndex((product) => product.id === updatedProduct.id);

  if (index !== -1) {
    MOCK_PRODUCTS[index] = {
      ...MOCK_PRODUCTS[index],
      ...updatedProduct,
      createdAt: MOCK_PRODUCTS[index].createdAt, // Mantém a data de criação original
    };
  }

  return MOCK_PRODUCTS[index];
};

const deleteProduct = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  MOCK_PRODUCTS = MOCK_PRODUCTS.filter((p) => p.id !== id);
};

// React Query hooks
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => MOCK_PRODUCTS.find((product) => product.id === id),
    enabled: !!id, // Evita buscar se o ID for nulo
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (updatedProduct) => {
      console.log("##################");
      console.log(updatedProduct);
      console.log("##################");
      // Atualiza o cache sem recarregar toda a lista
      queryClient.setQueryData<Product[]>(["products"], (oldData) =>
        oldData
          ? oldData.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
          : [],
      );
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
