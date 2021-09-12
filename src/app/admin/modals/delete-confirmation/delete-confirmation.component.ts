import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {SizeService} from '../../services/size.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SaleService} from '../../services/sale.service';
import {ProductService} from '../../services/product.service';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {

  @Input()
  type: 'Produit' | 'Taille' | 'Catégorie' | 'Promotion' | 'Commande';
  @Input()
  id: number;


  constructor(private categoryService: CategoryService, private toastr: ToastrService,
              private sizeService: SizeService, private activeModal: NgbActiveModal,
              private saleService: SaleService, private productService: ProductService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
  }

  deleteEntity() {
    switch (this.type) {
      case 'Catégorie':
        this.deleteCategory();
        break;
      case 'Commande':
        this.deleteOrder();
        break;
      case 'Produit':
        this.deleteProduct();
        break;
      case 'Promotion':
        this.deleteSale();
        break;
      case 'Taille':
        this.deleteSize();
        break;
    }
  }

  private deleteCategory() {
    this.categoryService.deleteCategory(this.id).subscribe(c => {
      this.closeModal(c);

      this.showToast('SUCCESS', `${this.type} suprimée`, `${this.type} avec id ${this.id} a été supprimé`);
    }, error => {
      this.showToast('ERROR', `Opération non effecutée`, `Une erreur s'est produite`);

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


  private deleteSize() {
    this.sizeService.deleteSize(this.id).subscribe(c => {
      this.closeModal(c);
      this.showToast('SUCCESS', `${this.type} suprimée`, `${this.type} avec id ${this.id} a été supprimé`);
    }, error => {
      this.showToast('ERROR', `Opération non effecutée`, `Une erreur s'est produite`);

    });

  }

  closeModal(c?: any) {
    this.activeModal.close(c);
  }

  private deleteSale() {
    this.saleService.deleteSale(this.id).subscribe(c => {
      this.closeModal(c);
      this.showToast('SUCCESS', `${this.type} suprimée`, `${this.type} avec id ${this.id} a été supprimé`);
    }, error => {
      this.showToast('ERROR', `Opération non effecutée`, `Une erreur s'est produite`);

    });
  }

  private deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(c => {
      this.closeModal(c);
      this.showToast('SUCCESS', `${this.type} suprimée`, `${this.type} avec id ${this.id} a été supprimé`);
    }, error => {
      this.showToast('ERROR', `Opération non effecutée`, `Une erreur s'est produite`);

    });

  }

  private deleteOrder() {
    this.orderService.deleteOrder(this.id).subscribe(c => {
      this.closeModal(c);
      this.showToast('SUCCESS', `${this.type} suprimée`, `${this.type} avec id ${this.id} a été supprimé`);
    }, error => {
      this.showToast('ERROR', `Opération non effecutée`, `Une erreur s'est produite`);

    });


  }
}
