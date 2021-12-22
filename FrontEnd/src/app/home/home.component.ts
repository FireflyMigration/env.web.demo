import { Component, OnInit } from '@angular/core';

import { Remult } from 'remult';
import { SelectPopupComponent } from '../common/select-popup/select-popup.component';
import { BusyService, getValueList, GridSettings, openDialog, Lookup } from '@remult/angular';
import { Customers } from '../customers/customers';
import { Orders } from './orders';
import { OrderDetails } from './orderDetails';
import { Products } from '../products/products';
import { Shippers } from '../shippers/shippers';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private remult: Remult, private busyService: BusyService) {

  }
  lookup = new Lookup(this.remult.repo(Customers));
  ordersGrid = new GridSettings(this.remult.repo(Orders),
    {
      rowsInPage: 50,

      numOfColumnsInGrid: 4,
      allowUpdate: true,
      allowInsert: true,
      enterRow: orders => {
        this.busyService.donotWait(async () => {
          await this.orderDetailsGrid.get({
            where: {
              orderID: orders.id
            },
            limit: 50
          })
        });
      },
      columnSettings: orders => [
        {
          field: orders.id,
          width: '90px',
          readonly: true,
        },
        {
          field: orders.customerID,
          getValue: (order) => this.lookup.get({ id: order.customerID }).companyName,
          click: (order) =>
            openDialog(SelectPopupComponent,
              popup => popup.config(this.remult.repo(Customers),
                {
                  onSelect: selected => { order.customerID = selected.id }
                })),
          width: '200px'
        },

        {
          field: orders.orderDate,
          width: '170px'
        },
        {
          field: orders.shipVia,
          width: '150px',
          valueList: () => getValueList(this.remult.repo(Shippers)),
        },
        orders.employeeID,
        orders.requiredDate!,
        orders.shippedDate!,
        orders.freight,
        orders.shipName,
        orders.shipAddress,
        orders.shipCity,
        orders.shipRegion,
        orders.shipPostalCode,
        orders.shipCountry

      ],
      rowButtons: [
        {
          click: orders =>
            window.open(
              '/home/print/' + orders.id),
          showInLine: true,
          textInMenu: 'Print',
          icon: 'print'
        }
      ],
    }
  );
  shipInfoArea = this.ordersGrid.addArea({
    numberOfColumnAreas: 2,
    fields: orders => [
      orders.requiredDate!,
      orders.shippedDate!,
      orders.shipAddress,
      orders.shipCity
    ]
  });
  orderDetailsGrid = new GridSettings(this.remult.repo(OrderDetails), {
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true,

    columnSettings: order_details => [
      {
        field: order_details.productID,
        width: '250px',
        valueList: getValueList(this.remult.repo(Products))
      }, {
        field: order_details.unitPrice,
        width: '100px'
      },
      {
        field: order_details.quantity, width: '100px'
      },
      {
        caption: 'Total',
        width: '100px',
        getValue: orderDetails =>
          (orderDetails.quantity * orderDetails.unitPrice).toFixed(2)
      }
    ],
    newRow: orderDetail => {
      orderDetail.orderID = this.ordersGrid.currentRow.id;
      orderDetail.quantity = 1;
    },

  });
  getOrderTotal() {
    let result = 0;
    this.orderDetailsGrid.items.forEach(
      orderDetail =>
        result += orderDetail.quantity * orderDetail.unitPrice);
    return result.toFixed(2);
  }
  printCurrentOrder() {
    window.open(
      '/home/print/' + this.ordersGrid.currentRow.id);
  }

}

