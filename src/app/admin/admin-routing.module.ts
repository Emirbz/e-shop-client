import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutAdminComponent} from '../layout/components/layout-admin/layout-admin.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {ListProductComponent} from './components/list-product/list-product.component';
import {OrdersComponent} from './components/orders/orders.component';
import {AddProductComponent} from './components/add-product/add-product.component';
import {SalesListComponent} from './components/sales-list/sales-list.component';
import {SizesListComponent} from './components/sizes-list/sizes-list.component';
import {EditProductComponent} from './components/edit-product/edit-product.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardGuard} from './guards/auth-guard.guard';


const adminRouting: Routes = [
  {
    path: '',
    component: LayoutAdminComponent,
    children: [

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        component: DashboardComponent,
        redirectTo: '', pathMatch: 'full',
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'categories',
        component: CategoriesListComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'products/list',
        component: ListProductComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'products/edit/:id',
        component: EditProductComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'products/create',
        component: AddProductComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'sale',
        component: SalesListComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'sizes',
        component: SizesListComponent,
        canActivate: [AuthGuardGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRouting)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
