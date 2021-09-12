import Category from './Category';
import Picture from './Picture';
import Size from './Size';
import Sale from './Sale';

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
  sale?: Sale;
  status?: string;
  pictures?: Picture[];
  cart?: {
    size: ProductSize;
    quantity: number;
  };

}

export class ProductSize {
  id?: any;
  size: Size;
  quantity: number;
}

