import {AfterViewInit, Component, OnInit} from '@angular/core';
import Product from './admin/models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    if (localStorage.getItem('cartProducts') === null) {
      const cartProduct: Product[] = [];
      localStorage.setItem('cartProducts', JSON.stringify(cartProduct));
    }
  }


}




