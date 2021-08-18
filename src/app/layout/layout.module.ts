import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutShopComponent} from './components/layout-shop/layout-shop.component';
import {RouterModule} from '@angular/router';
import { LayoutAdminComponent } from './components/layout-admin/layout-admin.component';
import { HeaderComponent } from './components/layout-admin/components/header/header.component';
import { SideMenuComponent } from './components/layout-admin/components/side-menu/side-menu.component';
import {FooterComponent} from './components/layout-shop/components/footer/footer.component';
import { NavMenuComponent } from './components/layout-shop/components/nav-menu/nav-menu.component';



@NgModule({
  declarations: [LayoutShopComponent, FooterComponent, LayoutAdminComponent, HeaderComponent, SideMenuComponent, NavMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutShopComponent ]
})
export class LayoutModule {
}
