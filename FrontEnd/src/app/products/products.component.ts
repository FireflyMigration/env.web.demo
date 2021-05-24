import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Products, Suppliers, Categories } from '../models';
import { getValueList, GridSettings } from '@remult/angular';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private context: Context) {

  }

  products = new GridSettings(this.context.for(Products),
    {
      rowsInPage: 50,
      allowUpdate: true,
      allowInsert: true,

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
            valueList: getValueList(this.context.for(Suppliers))

          },
          {
            column: products.categoryID,
            width: '150px',
            valueList: getValueList(this.context.for(Categories))
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
