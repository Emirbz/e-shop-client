import Picture from './Picture';
import User from './User';
import Product from './Product';

export default class Order {
  id?: string;
  status?: string;
  user?: User;
  orderItems?: OrderItem[];
}

export class OrderItem {
  product: Product;
  quantity: number;
}
