import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AlertModule, TabsModule, BsDropdownModule, CollapseModule } from "ngx-bootstrap";
import { AppComponent } from './app.component';
import { RadWebModule } from 'radweb';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    RadWebModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
