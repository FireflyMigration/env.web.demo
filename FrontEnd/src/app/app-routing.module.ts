import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, ActivatedRouteSnapshot, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ShowDialogOnErrorErrorHandler } from './common/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from './common/sign-in/user.service';
import { RemultModule } from '@remult/angular';




const routes: Route[] = [
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
    CommonModule, RouterModule.forRoot(routes),
    RemultModule,
    JwtModule.forRoot({
      config: { tokenGetter: () => UserService.getToken() }
    })
  ],
  providers: [UserService, { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler }],
  declarations: [],
  exports: [RouterModule, RemultModule]
})
export class AppRoutingModule { }

