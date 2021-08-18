import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {LayoutModule} from '../layout/layout.module';
import { LeftSidebarProductsComponent } from './components/left-sidebar-products/left-sidebar-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';


@NgModule({
  declarations: [ShopComponent, LeftSidebarProductsComponent, ProductDetailsComponent, CheckoutComponent, CartComponent, ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    LayoutModule
  ], exports: [ShopComponent]
})
export class ShopModule {
}
