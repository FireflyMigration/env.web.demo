import { Component, OnInit } from '@angular/core';
import { remult } from 'remult';
import {  getEntityValueList, GridSettings } from 'common-ui-elements/interfaces';
import { Products } from './products';
import { Suppliers } from '../suppliers/suppliers';
import { Categories } from '../categories/categories';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor() {

  }

  products = new GridSettings(remult.repo(Products),
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
            valueList: getEntityValueList(remult.repo(Suppliers))

          },
          {
            field: products.categoryID,
            width: '150px',
            valueList: getEntityValueList(remult.repo(Categories))
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
