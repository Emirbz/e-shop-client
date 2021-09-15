import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProductService} from '../../../admin/services/product.service';
import {ActivatedRoute} from '@angular/router';
import Product, {ProductSize} from '../../../admin/models/Product';
import {CartService} from '../../services/cart.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Sale from '../../../admin/models/Sale';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  productHasBeenLoaded = false;
  loadedProduct: Product;
  sizeToCart: ProductSize;
  quantityToCart = 0;
  productToCart: { product: Product, showToast: boolean } = {product: undefined, showToast: false};
  cartFormGroup: FormGroup;
  productsHasBeenLoaded = false;
  loadedProducts: Product[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private activeRouter: ActivatedRoute,
              private cartService: CartService) {
  }

  ngOnInit(): void {

    this.loadSingleProduct().then();
    this.loadProducts();
  }

  loadProducts() {
    this.productsHasBeenLoaded = false;
    this.productService.getAllProducts(0).subscribe(p => {
      this.loadedProducts = p;
      this.productsHasBeenLoaded = true;
    }, error => {
      this.productsHasBeenLoaded = true;
    });
  }


  ngAfterViewInit(): void {


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }

  async loadSingleProduct() {
    this.productHasBeenLoaded = false;
    const id = this.activeRouter.snapshot.params.id;
    this.productService.getSingleProduct(id).subscribe(p => {
      this.loadedProduct = p;
      this.productHasBeenLoaded = true;
      this.cartFormValidate();
      this.loadScript('assets/js/slick.js');
      this.loadScript('assets/js/script.js');
    }, error => {
      this.productHasBeenLoaded = true;

    });
  }

  addToCart() {
    if (this.cartFormGroup.value.quantity === 0 || (!this.sizeToCart && this.loadedProduct?.sizes?.length > 0)) {

      return;
    } else {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) as Product[];
      const p = this.loadedProduct;
      this.loadedProduct.cart = {size: this.sizeToCart, quantity: this.cartFormGroup.value.quantity};
      cartProducts.push(p);
      this.cartService.cartProducts = cartProducts;
      this.productToCart = {product: p, showToast: true};
      console.log(this.productToCart);
      setTimeout(() => {
        this.productToCart.showToast = false;
      }, 3000);

    }


  }

  setSizeToBuy(text: ProductSize) {
    this.sizeToCart = text;

  }

  private cartFormValidate() {
    this.cartFormGroup = this.formBuilder.group({
      quantity: [1, Validators.min(1)]
    });

  }

  isNumber(value: string) {
    return /^\d+$/.test(value);
  }

  calculateNewPrice(price: number, percentage: number) {
    return price - ((price * percentage) / 100);

  }

  daysLeft(sale: Sale) {
    const currentDate = new Date();
    const dateSent = new Date(sale.endDate);

    // tslint:disable-next-line:max-line-length
    return Math.abs(Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24)));

  }
}
