import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ColumnMode} from '@swimlane/ngx-datatable';
import Product from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {AddCategoryComponent} from '../../modals/add-category/add-category.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddSaleComponent} from '../../modals/add-sale/add-sale.component';
import set = Reflect.set;
import Category from '../../models/Category';
import {DeleteConfirmationComponent} from '../../modals/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit, AfterViewInit {

  loadedProducts: Product[] = [];
  productsHasBeenLoaded = false;


  constructor(private productService: ProductService, private modalService: NgbModal) {
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


  ngOnInit(): void {
    this.loadProducts();

  }

  loadProducts() {
    this.productsHasBeenLoaded = false;
    this.productService.getAllProducts().subscribe(p => {
      this.loadedProducts = p.content;
      this.productsHasBeenLoaded = true;
      this.initDataTable();
    }, error => {
      this.productsHasBeenLoaded = true;
    });
  }


  openModalAddSale(p: Product) {
    const modalRef = this.modalService.open(
      AddSaleComponent
    );
    // modalRef.result.then((c) => {
    //   if (c !== undefined) {
    //     this.loadedCategories.push(c);
    //   }
    //
    // });
    modalRef.componentInstance.product = p;


  }

  private initDataTable() {
    setTimeout(() => { // @ts-ignore
      $('#products_list').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    }, 100);

  }

  openModalDeleteProduct(prod: Product) {
    const modalRef = this.modalService.open(
      DeleteConfirmationComponent
    );
    modalRef.result.then((c) => {
      if (c !== undefined) {
        this.removeProduct(c);
      }

    });
    modalRef.componentInstance.type = 'Produit';
    modalRef.componentInstance.id = prod.id;


  }


  removeProduct(c: Category) {
    const indexToRemove = this.loadedProducts.map(item => item.id).indexOf(c.id);
    this.loadedProducts.splice(indexToRemove, 1);
  }

}
