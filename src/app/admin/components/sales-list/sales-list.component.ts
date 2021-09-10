import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SaleService} from '../../services/sale.service';
import {ToastrService} from 'ngx-toastr';
import {DeleteConfirmationComponent} from '../../modals/delete-confirmation/delete-confirmation.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Sale from '../../models/Sale';
import {EditSaleComponent} from '../../modals/edit-sale/edit-sale.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit, AfterViewInit {
  salesHasBeenLoaded = false;
  loadedSales: Sale[] = [];

  constructor(private saleService: SaleService, private toastr: ToastrService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadSales();
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

  private loadSales() {
    this.saleService.getSales().subscribe(c => {
      this.loadedSales = c;
      this.salesHasBeenLoaded = true;
      this.initDataTable();
    }, error => {
      this.salesHasBeenLoaded = true;
    });
  }


  private initDataTable() {
    setTimeout(() => { // @ts-ignore
      $('#sales_list').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    }, 100);

  }

  openModalDeleteSale(s: Sale) {
    const modalRef = this.modalService.open(
      DeleteConfirmationComponent
    );
    modalRef.result.then((sale) => {
      if (sale !== undefined) {
        this.removeSale(sale);
      }

    });
    modalRef.componentInstance.type = 'Promotion';
    modalRef.componentInstance.id = s.id;

  }

  openModalEditSale(s: Sale) {
    const modalRef = this.modalService.open(
      EditSaleComponent
    );
    modalRef.result.then((sale) => {
      if (sale !== undefined) {
        this.updateSales(sale);
      }

    });
    modalRef.componentInstance.sizeToEdit = s;


  }

  private updateSales(s: Sale) {
    const indexToRemove = this.loadedSales.map(item => item.id).indexOf(s.id);
    this.loadedSales[indexToRemove] = s;
  }



  removeSale(c: Sale) {
    const indexToRemove = this.loadedSales.map(item => item.id).indexOf(c.id);
    this.loadedSales.splice(indexToRemove, 1);
  }


}
