import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShopRoutingModule} from './shop-routing.module';
import {ShopComponent} from './shop.component';
import {LayoutModule} from '../layout/layout.module';
import {LeftSidebarProductsComponent} from './components/left-sidebar-products/left-sidebar-products.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {CartComponent} from './components/cart/cart.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {OrderSucessComponent} from './modals/order-sucess/order-sucess.component';
import {TrackOrderComponent} from './components/track-order/track-order.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    ShopComponent,
    LeftSidebarProductsComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    CartComponent,
    ProfileComponent,
    EditProfileComponent,
    LandingPageComponent,
    NotFoundComponent,
    OrderSucessComponent,
    TrackOrderComponent,
    CategoriesComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ], exports: [ShopComponent]
})
export class ShopModule {
}
