import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ColumnMode} from '@swimlane/ngx-datatable';
import Category from '../../models/Category';
import {CategoryService} from '../../services/category.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditCategoryComponent} from '../../modals/edit-category/edit-category.component';
import {AddCategoryComponent} from '../../modals/add-category/add-category.component';
import {DeleteConfirmationComponent} from '../../modals/delete-confirmation/delete-confirmation.component';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, AfterViewInit {
  ColumnMode = ColumnMode;
  reorderable = true;
  loadedCategories: Category[] = [];


  categoryToDelete: Category;
  categoryToEdit: Category = {};
  categoriesHasBeenLoaded = false;

  constructor(private categoryService: CategoryService, private modalService: NgbModal, private toastr: ToastrService) {

  }


  ngOnInit(): void {
    this.loadCategories();
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


  private loadCategories() {
    this.categoryService.getCategories().subscribe(c => {
      this.loadedCategories = c;
      this.categoriesHasBeenLoaded = true;
      this.initDataTable();
    }, error => {
      this.showToast('ERROR', 'Liste categories not chargée', 'Une erreur s\'est produite');
      this.categoriesHasBeenLoaded = true;
    });

  }

  removeCategory(c: Category) {
    const indexToRemove = this.loadedCategories.map(item => item.id).indexOf(c.id);
    this.loadedCategories.splice(indexToRemove, 1);
  }


  openModalEditCategory(cat: Category) {
    const modalRef = this.modalService.open(
      EditCategoryComponent
    );
    modalRef.result.then((c) => {
      if (c !== undefined) {
        this.updateCategories(c);
      }

    });
    modalRef.componentInstance.categoryToEdit = cat;

  }

  private updateCategories(c: Category) {
    const indexToRemove = this.loadedCategories.map(item => item.id).indexOf(c.id);
    this.loadedCategories[indexToRemove] = c;
  }

  openModalAddCategory() {
    const modalRef = this.modalService.open(
      AddCategoryComponent
    );
    modalRef.result.then((c) => {
      if (c !== undefined) {
        this.loadedCategories.push(c);
      }

    });


  }

  openModalDeleteCategory(cat: Category) {
    const modalRef = this.modalService.open(
      DeleteConfirmationComponent
    );
    modalRef.result.then((c) => {
      if (c !== undefined) {
        this.removeCategory(c);
      }

    });
    modalRef.componentInstance.type = 'Catégorie';
    modalRef.componentInstance.id = cat.id;


  }


  private initDataTable() {
    setTimeout(() => { // @ts-ignore
      $('#cat_list').DataTable({
        language: {
          url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
        }
      });
    }, 100);

  }

}
