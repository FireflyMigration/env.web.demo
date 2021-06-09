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
            field: products.id,
            width: '100px',
          },
          {
            field: products.productName,
            width: '250px',
          },


          {
            field: products.supplierID,
            width: '250px',
            valueList: getValueList(this.context.for(Suppliers))

          },
          {
            field: products.categoryID,
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
    fields: products => [
      products.unitPrice,
      products.unitsInStock,
      products.unitsOnOrder,
      products.reorderLevel,
    ]
  });

}
