import { Product } from './product';
export interface Category {
    categoryId: number;
    name: string;
    description: string;
    products: Product[]; 
    childCategories: Category[]; 
    parentCategory?: Category;
  }
  