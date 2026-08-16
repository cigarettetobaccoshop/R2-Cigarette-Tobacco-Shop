export type ProductCategory = 'r2' | 'resmi';

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  subcategory: string | null;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
  description: string;
  image?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export type OrderStatus = 'pending' | 'diproses' | 'dikirim' | 'selesai';

export interface OrderCustomer {
  nama: string;
  whatsapp: string;
  alamat: string;
  patokan?: string;
  ekspedisi: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  resi?: string;
}
