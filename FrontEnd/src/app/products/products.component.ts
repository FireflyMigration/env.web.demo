import { Component, OnInit } from '@angular/core';
import { GridSettings, Context } from 'radweb';
import { Products, Suppliers, Categories } from '../models';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private context: Context) {

  }
  selectCustomerGrid = this.context.for(Suppliers).gridSettings(
    {

      numOfColumnsInGrid: 2,
      columnSettings: suppliers => [
        suppliers.id,
        suppliers.companyName
      ]
    });
  selectCategoriesGrid = this.context.for(Categories).gridSettings(
    {

      numOfColumnsInGrid: 2,
      columnSettings: categories => [
        categories.id,
        categories.categoryName
      ]
    });
  products = this.context.for(Products).gridSettings(
    {
      get: {
        limit: 25
      },
      allowUpdate: true,
      allowInsert: true,
      hideDataArea: true,
      columnSettings: products =>
        [
          {
            column: products.id,
            width: '100px',
          },
          {
            column: products.productName,
            width: '250px',
          },


          {
            column: products.supplierID,
            width: '250px',
            dropDown: {
              source: this.context.for(Suppliers).create()
            }
          },
          {
            column: products.categoryID,
            width: '250px',
            dropDown: {
              source: this.context.for(Categories).create()
            }
          },

          products.quantityPerUnit,
          products.unitPrice,
          products.unitsInStock,
          products.unitsOnOrder,
          products.reorderLevel,
          products.discontinued,

        ]


    });
  ngOnInit() {
  }
  ProductInfoArea = this.products.addArea({
    numberOfColumnAreas: 2,
    columnSettings: products => [
      products.unitPrice,
      products.unitsInStock,
      products.unitsOnOrder,
      products.reorderLevel,
    ]
  });

}
