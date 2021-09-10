import {AfterViewInit, Component, OnInit} from '@angular/core';
import Product from '../../../../../admin/models/Product';
import {CartService} from '../../../../../shop/services/cart.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, AfterViewInit {

  cartProducts: Product[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.loadCart();
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/menu.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

  private loadCart() {
    this.cartService.itemValue.subscribe(value => {
      if (value != null) {
        this.cartProducts = value;
      }
    });


  }

  calcTotalPrice() {
    let totalPrice = 0;
    this.cartProducts.forEach(p => {
      totalPrice += p?.cart.quantity * p.price;

    });
    return totalPrice;
  }

  removeProduct(pr: Product) {
    const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) as Product[];
    const indexToRemove = cartProducts.findIndex(p => p.id === pr.id);
    cartProducts.splice(indexToRemove, 1);
    this.cartService.cartProducts = cartProducts;

  }
}
