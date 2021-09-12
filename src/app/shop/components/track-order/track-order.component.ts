import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../admin/services/order.service';
import Order from '../../../admin/models/Order';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {
  ordersHasBeenLoaded = false;
  loadedOrders: Order[] = [];
  loadedStatus = ['Commande passée', 'Commande confirmée', 'En livraison', 'Livré'];


  constructor(private orderService: OrderService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

   loadOrders() {
    this.ordersHasBeenLoaded = false;
    this.orderService.getOrders().subscribe(orders => {
      this.loadedOrders = orders;
      this.ordersHasBeenLoaded = true;

    }, error => {
      this.ordersHasBeenLoaded = true;
      this.showToast('ERROR', 'Liste commandes not chargée', 'Une erreur s\'est produite');
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

  isDone(status: string, step: number) {
    const index = this.loadedStatus.indexOf(status);

    return step < index;

  }
  isCurrent(status: string, step: number) {
    const index = this.loadedStatus.indexOf(status);

    return step === index;

  }
}
