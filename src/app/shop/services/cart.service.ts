import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import Product from '../../admin/models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemValue = new BehaviorSubject(this.cartProducts);


  constructor() {
  }

  set cartProducts(value: Product[]) {
    localStorage.setItem('cartProducts', JSON.stringify(value));
    this.itemValue.next(value); // this will make sure to tell every subscriber about the change.
  }

  get cartProducts() {
    return JSON.parse((localStorage.getItem('cartProducts')));
  }
}
