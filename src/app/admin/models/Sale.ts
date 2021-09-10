import Category from './Category';
import Picture from './Picture';
import Size from './Size';
import Product from './Product';

export default class Sale {
  id?: number;
  startDate?: string;
  endDate?: string;
  product?: Product;
  percentage?: number;
}


