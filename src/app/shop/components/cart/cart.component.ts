import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import Product from '../../../admin/models/Product';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  loadedProducts: Product[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.cartService.itemValue.subscribe(p => {
      this.loadedProducts = p;
    });

  }

  calcTotalPrice() {
    let totalPrice = 0;
    this.loadedProducts.forEach(p => {
      if (p.sale) {
        totalPrice += p?.cart.quantity * this.calculateNewPrice(p.price, p.sale.percentage);
      }
      else {
        totalPrice += p?.cart.quantity * p.price;
      }
    });
    return totalPrice;
  }
  calculateNewPrice(price: number, percentage: number) {
    return price - ((price * percentage) / 100);

  }

  updateQuantity(p: Product, value: string, innerText: string) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) as Product[];
    const indexToUpdate = cartProducts.findIndex((pr => pr.id === p.id && pr.cart.size.size.name === innerText));
    cartProducts[indexToUpdate].cart.quantity = +value;
    this.cartService.cartProducts = cartProducts;


  }

  removeProduct(pr: Product) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) as Product[];
    const indexToRemove = cartProducts.findIndex(p => p.id === pr.id);
    cartProducts.splice(indexToRemove, 1);
    this.cartService.cartProducts = cartProducts;

  }
}
