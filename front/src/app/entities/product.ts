import { Category } from './category';
import { ProductImage } from './product_image';
export interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    categories: Category[]; 
    images: ProductImage[];
  }
  