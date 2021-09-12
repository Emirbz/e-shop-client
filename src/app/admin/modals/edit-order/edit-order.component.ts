import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import Order from '../../models/Order';
import {OrderService} from '../../services/order.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  @Input()
  order: Order;
  orderFormGroup: FormGroup;
  submittingData = false;
  loadedStatus: string[] = [];

  constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder,
              private orderService: OrderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initOrderFormGroup();
  }

  closeModal(param: any) {
    this.activeModal.close(param);

  }

  editOrder() {
    const updatedOrder = this.order;
    this.submittingData = true;
    updatedOrder.status = this.orderFormGroup.value.status;
    this.orderService.updateOrder(updatedOrder).subscribe(c => {
      this.showToast('SUCCESS', 'Categorie modifée', 'La commande a été modifée avec success! ');
      this.submittingData = false;
      this.closeModal(c);
    }, error => {
      this.submittingData = false;
      this.showToast('ERROR', 'Commande non modifiée', 'Une erreur serveur s\'est produite');

    });


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

  private initOrderFormGroup() {
    this.orderFormGroup = this.formBuilder.group({
      status: ['', Validators.required]
    });
    this.orderFormGroup.patchValue({
      status: this.loadedStatus[this.fillStatus(this.order)],
    });
  }

  private fillStatus(o: Order) {
    return this.loadedStatus.findIndex(g => g === o.status);

  }
}
