import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutAdminComponent} from '../layout/components/layout-admin/layout-admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {ListProductComponent} from './products/list-product/list-product.component';
import {AddProductComponent} from './products/add-product/add-product.component';

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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRouting)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
