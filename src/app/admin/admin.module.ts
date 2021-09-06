import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ListProductComponent} from './components/list-product/list-product.component';
import {OrdersComponent} from './components/orders/orders.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ToastrModule} from 'ngx-toastr';
import {SalesListComponent} from './components/sales-list/sales-list.component';
import {SizesListComponent} from './components/sizes-list/sizes-list.component';
import {DeleteConfirmationComponent} from './modals/delete-confirmation/delete-confirmation.component';
import {AddCategoryComponent} from './modals/add-category/add-category.component';
import {EditCategoryComponent} from './modals/edit-category/edit-category.component';
import {AddSizeComponent} from './modals/add-size/add-size.component';
import {EditSizeComponent} from './modals/edit-size/edit-size.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [DashboardComponent, CategoriesListComponent, AddProductComponent, ListProductComponent, OrdersComponent, SalesListComponent, SizesListComponent, DeleteConfirmationComponent, AddCategoryComponent, EditCategoryComponent, AddSizeComponent, EditSizeComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgxDatatableModule,
    NgbModalModule
  ]
})
export class AdminModule {
}
