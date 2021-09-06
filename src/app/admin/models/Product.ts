import Category from './Category';
import Picture from './Picture';

export default class Product {
  id?: number;
  name?: string;
  description?: string;
  sizes?: Size[];
  gender?: string;
  category?: Category[];
  collection?: string;
  drop?: boolean;
  price?: number;
  status?: string;
  pictures?: Picture[];
}

export class Size {
  name: string;
  quantity?: number;
}


