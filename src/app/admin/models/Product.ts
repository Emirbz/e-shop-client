import Category from './Category';
import SubCategory from './SubCategory';

export default class Product {
  id?: number;
  name?: string;
  description?: string;
  sizes?: Size[];
  gender?: string;
  category?: Category;
  subCategory?: SubCategory;
  collection?: string;
  price?: number;
  status?: string;
}

class Size {
  name: string;
  quantity: number;
}


