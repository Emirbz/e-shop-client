import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutShopComponent} from '../layout/components/layout-shop/layout-shop.component';
import {ShopComponent} from './shop.component';
import {LeftSidebarProductsComponent} from './components/left-sidebar-products/left-sidebar-products.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {CartComponent} from './components/cart/cart.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';

const shopRouting: Routes = [
  {
    path: '',
    component: LayoutShopComponent,
    children: [
      {
        path: '',
        component: ShopComponent,
        redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'products',
        component: LeftSidebarProductsComponent,
      }, {
        path: 'products/:id',
        component: ProductDetailsComponent,
      }, {
        path: 'checkout',
        component: CheckoutComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'profile/edit',
        component: EditProfileComponent,
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(shopRouting)],
  exports: [RouterModule]
})
export class ShopRoutingModule {
}
