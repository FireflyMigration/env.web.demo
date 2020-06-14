import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRouteSnapshot, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';


import { SignInComponent } from './common/sign-in/sign-in.component';
import { SignedInGuard } from '@remult/core';



const routes: myRoute[] = [
  { path: 'Orders', component: HomeComponent },
  { path: 'Customers', component: CustomersComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'Categories', component: CategoriesComponent },
  { path: 'Shippers', component: ShippersComponent },
  { path: 'Suppliers', component: SuppliersComponent },

  { path: '', redirectTo: '/Orders', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export class dummyRoute extends ActivatedRouteSnapshot {
  constructor() {
    super();

  }
  routeConfig;
}
export interface myRoute extends Route {
  data?: myRouteData;
}
export interface myRouteData {
  allowedRoles?: string[];

}