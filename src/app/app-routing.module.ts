import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './shop/components/not-found/not-found.component';
import {LandingPageComponent} from './shop/components/landing-page/landing-page.component';
import {LandingGuard} from './shop/guards/landing.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  }, {
    path: 'landing',
    component: LandingPageComponent,
    canActivate:[LandingGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {path: '404', component: NotFoundComponent},

  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


