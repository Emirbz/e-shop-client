import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutAdminComponent} from '../layout/components/layout-admin/layout-admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {ListProductComponent} from './components/list-product/list-product.component';
import {OrdersComponent} from './components/orders/orders.component';
import {AddProductComponent} from './components/add-product/add-product.component';


const adminRouting: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
        path: 'products',
        component: ListProductComponent,
      },
      {
        path: 'products/create',
        component: AddProductComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRouting)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
