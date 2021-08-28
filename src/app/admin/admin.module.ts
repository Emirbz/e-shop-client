import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ListProductComponent} from './components/list-product/list-product.component';
import {OrdersComponent} from './components/orders/orders.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [DashboardComponent, CategoriesListComponent, AddProductComponent, ListProductComponent, OrdersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
