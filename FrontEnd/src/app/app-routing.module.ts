import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: 'Orders', component: HomeComponent },
  { path: 'Customers', component: CustomersComponent },
  { path: 'Products', component: ProductsComponent },
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
