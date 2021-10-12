import { Component, OnInit } from '@angular/core';
import { Remult } from 'remult';
import { getValueList, GridSettings } from '@remult/angular';
import { Products } from './products';
import { Suppliers } from '../suppliers/suppliers';
import { Categories } from '../categories/categories';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private remult: Remult) {

  }

  products = new GridSettings(this.remult.repo(Products),
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
            valueList: getValueList(this.remult.repo(Suppliers))

          },
          {
            field: products.categoryID,
            width: '150px',
            valueList: getValueList(this.remult.repo(Categories))
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
