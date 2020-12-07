import { Component, OnInit } from '@angular/core';
import { GridSettings, Context } from '@remult/core';
import { Products, Suppliers, Categories } from '../models';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private context: Context) {

  }

  products = this.context.for(Products).gridSettings(
    {
      get: {
        limit: 50
      },
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
            valueList: this.context.for(Suppliers).getValueList()

          },
          {
            column: products.categoryID,
            width: '150px',
            valueList: this.context.for(Categories).getValueList()
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
