export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  createdAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export interface UpdateProductData extends CreateProductData {
  id: string;
}
