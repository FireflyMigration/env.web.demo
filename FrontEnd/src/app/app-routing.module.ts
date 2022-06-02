import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,  Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShippersComponent } from './shippers/shippers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ShowDialogOnErrorErrorHandler } from './common/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { RemultModule } from '@remult/angular';
import { AuthService } from './common/sign-in/auth.service';




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
      config: { tokenGetter: () => AuthService.fromStorage() }
    })
  ],
  providers: [AuthService, { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler }],
  declarations: [],
  exports: [RouterModule, RemultModule]
})
export class AppRoutingModule { }

