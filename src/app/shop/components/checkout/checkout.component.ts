import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import Product from '../../../admin/models/Product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import User from '../../../admin/models/User';
import Order, {OrderItem} from '../../../admin/models/Order';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderSucessComponent} from '../../modals/order-sucess/order-sucess.component';
import {EditCategoryComponent} from '../../../admin/modals/edit-category/edit-category.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loadedProducts: Product[] = [];
  userFormGroup: FormGroup;

  constructor(private cartService: CartService, private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.userFormValidate();
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
      totalPrice += p?.cart.quantity * p.price;

    });
    return totalPrice;
  }

  private userFormValidate() {
    this.userFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      address: ['', Validators.required],
      town: ['', Validators.required],
      postalCode: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{7}')])],
    });

  }

  placeOrder() {
    if (!this.userFormGroup.valid) {
      return;
    } else {
      const user = this.userFormGroup.value as User;
      const order: Order = {orderItems: [], user, status: 'En attente de confirmation'};
      this.loadedProducts.forEach(product => {
        order.orderItems.push({product, quantity: product.cart.quantity});

      });
      this.openModalSuccess();
    }


  }

  private openModalSuccess() {
    const modalRef = this.modalService.open(
      OrderSucessComponent,{ size: 'md', backdrop: 'static' }
    );

  }
}
