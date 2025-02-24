export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
} 