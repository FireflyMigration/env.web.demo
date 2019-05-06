import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTabsModule, MatMenuModule } from '@angular/material';
import { AppComponent } from './app.component';
import { RadWebModule } from 'radweb';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CategoriesComponent } from './categories/categories.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ShippersComponent } from './shippers/shippers.component';


import {SelectPopupComponent} from './common/select-popup/select-popup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SignInComponent } from './common/sign-in/sign-in.component';
import { SelectService } from './common/select-popup/select-popup.component';
import { AuthService, AuthorizedGuard } from './common/auth/auth-service';
import { YesNoQuestionComponent } from './common/yes-no-question/yes-no-question.component';
import { DialogService } from './common/dialog';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent,
    CategoriesComponent,
    SuppliersComponent,
    ShippersComponent,
    SelectPopupComponent,
    
    SignInComponent,
    YesNoQuestionComponent
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    RadWebModule,
    HttpClientModule
  ],
  providers: [SelectService, AuthService,AuthorizedGuard,DialogService],
  bootstrap: [AppComponent],
  entryComponents: [SelectPopupComponent,SignInComponent,YesNoQuestionComponent]
})
export class AppModule { }
