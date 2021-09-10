import Category from './Category';
import Picture from './Picture';
import Size from './Size';

export default class Product {
  id?: number;
  name?: string;
  description?: string;
  sizes?: ProductSize[];
  gender?: string;
  categories?: Category[];
  collection?: string;
  drop?: boolean;
  price?: number;
  status?: string;
  pictures?: Picture[];
  cart: {
    size: string;
    quantity: number;
  };

}

export class ProductSize {
  id?: any;
  size: Size;
  quantity: number;
}

