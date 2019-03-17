import { Component, OnInit } from '@angular/core';
import { GridSettings } from 'radweb';
import { Products, Suppliers, Categories } from '../models';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selectCustomerGrid = new GridSettings<Suppliers>(new Suppliers(),
    {

      numOfColumnsInGrid: 2,
      columnSettings: suppliers => [
        suppliers.id,
        suppliers.companyName
      ]
    });
  selectCategoriesGrid = new GridSettings<Categories>(new Categories(),
    {

      numOfColumnsInGrid: 2,
      columnSettings: categories => [
        categories.id,
        categories.categoryName
      ]
    });
  products = new GridSettings<Products>(new Products(),
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
              source: new Suppliers
            }
          },
          {
            column: products.categoryID,
            width: '250px',
            dropDown: {
              source: new Categories
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
