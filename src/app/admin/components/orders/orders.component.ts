import {AfterViewInit, Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import Order from '../../models/Order';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Product from '../../models/Product';
import {AddSaleComponent} from '../../modals/add-sale/add-sale.component';
import User from '../../models/User';
import {DisplayUserComponent} from '../../modals/display-user/display-user.component';
import {DeleteConfirmationComponent} from '../../modals/delete-confirmation/delete-confirmation.component';
import Size from '../../models/Size';
import {EditSizeComponent} from '../../modals/edit-size/edit-size.component';
import {EditOrderComponent} from '../../modals/edit-order/edit-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {
  ordersHasBeenLoaded = false;
  loadedOrders: Order[] = [];

  constructor(private orderService: OrderService, private toastr: ToastrService,private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  ngAfterViewInit(): void {
    this.loadScript('assets/js/datatables/jquery.dataTables.min.js');
    this.loadScript('assets/js/datatables/custom-basic.js');


  }

  public loadScript(url): void {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementById('body').appendChild(node);


  }


  private loadOrders() {
    this.ordersHasBeenLoaded = false;
    this.orderService.getOrders().subscribe(orders => {
      this.loadedOrders = orders;
      this.ordersHasBeenLoaded = true;
      this.initDataTable();

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

  private initDataTable() {
    setTimeout(() => { // @ts-ignore
      $('#orders_list').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    }, 100);

  }


  openModalDeleteOrder(s: Order) {
    const modalRef = this.modalService.open(
      DeleteConfirmationComponent
    );
    modalRef.result.then((c) => {
      if (c !== undefined) {
        this.removeOrder(c);
      }

    });
    modalRef.componentInstance.type = 'Commande';
    modalRef.componentInstance.id = s.id;


  }

  openModalEditOrder(order: Order) {
    const modalRef = this.modalService.open(
      EditOrderComponent
    );
    modalRef.result.then((o) => {
      if (o !== undefined) {
        this.updateOrder(o);
      }

    });
    modalRef.componentInstance.order = order;

  }

  private updateOrder(s: Order) {
    const indexToRemove = this.loadedOrders.map(item => item.id).indexOf(s.id);
    this.loadedOrders[indexToRemove] = s;
  }

  removeOrder(c: Order) {
    const indexToRemove = this.loadedOrders.map(item => item.id).indexOf(c.id);
    this.loadedOrders.splice(indexToRemove, 1);
  }
  openModalUser(user: User) {
      const modalRef = this.modalService.open(
        DisplayUserComponent
      );
      // modalRef.result.then((c) => {
      //   if (c !== undefined) {
      //     this.loadedCategories.push(c);
      //   }
      //
      // });
      modalRef.componentInstance.user = user;


  }
}
