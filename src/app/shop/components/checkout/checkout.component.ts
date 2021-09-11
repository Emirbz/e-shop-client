import {Component, OnInit} from '@angular/core';
import {CartService} from '../../services/cart.service';
import Product from '../../../admin/models/Product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import User from '../../../admin/models/User';
import Order, {OrderItem} from '../../../admin/models/Order';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderSucessComponent} from '../../modals/order-sucess/order-sucess.component';
import {EditCategoryComponent} from '../../../admin/modals/edit-category/edit-category.component';
import {OrderService} from '../../../admin/services/order.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loadedProducts: Product[] = [];
  userFormGroup: FormGroup;
  submittingData = false;

  constructor(private cartService: CartService, private formBuilder: FormBuilder,
              private modalService: NgbModal, private orderService: OrderService,
              private toastr: ToastrService) {
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

  async placeOrder() {
    if (!this.userFormGroup.valid) {
      return;
    } else {
      this.submittingData = true;
      const user = this.userFormGroup.value as User;
      const order: Order = {orderItems: [], user, status: 'En attente de confirmation'};
      this.loadedProducts.forEach(product => {
        order.orderItems.push({
          product,
          quantity: product.cart.quantity,
          size: {name: product.cart.size.size.name, id: product.cart.size.size.id}
        });

      });
      this.orderService.addOrder(order).subscribe(o => {
        if (o) {
          this.openModalSuccess();
          this.submittingData = false;
        }

      }, error => {

        this.submittingData = false;
        this.showToast('ERROR', 'Taille non ajoutée', 'Une erreur serveur s\'est produite');

      });

    }


  }

  showToast(type: 'ERROR' | 'SUCCESS', title: string, message: string) {
    switch (type) {
      case 'ERROR':
        this.toastr.error(message, title, {
          progressBar: true,
          progressAnimation: 'decreasing'
        });
        break;
      case 'SUCCESS':
        this.toastr.success(message, title, {
          progressBar: true,
          progressAnimation: 'decreasing'
        });
        break;
    }

  }

  private openModalSuccess() {
    const modalRef = this.modalService.open(
      OrderSucessComponent, {size: 'md', backdrop: 'static'}
    );

  }
}
