import { Component, OnInit } from '@angular/core';
import * as models from './../models';

import { Context } from '@remult/core';
import { SelectPopupComponent, columnWithSelectPopupAndGetValue } from '../common/select-popup/select-popup.component';
import { BusyService, getValueList, GridSettings } from '@remult/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private context: Context, private busyService: BusyService) {

  }

  ordersGrid = new GridSettings( this.context.for(models.Orders),
    {
      get: {
        limit: 50
      },

      numOfColumnsInGrid: 4,
      allowUpdate: true,
      allowInsert: true,
      enterRow: orders => {
        this.busyService.donotWait(async () => {
          await this.orderDetailsGrid.get({
            where: orderDetails =>
              orderDetails.orderID.isEqualTo(orders.id),
            limit: 50
          })
        });
      },
      columnSettings: orders => [
        {
          column: orders.id,
          width: '90px',
          readonly: true,
        },
        columnWithSelectPopupAndGetValue(this.context, orders.customerID, models.Customers,
          {
            width: '300px'
          }),
        {
          column: orders.orderDate,
          width: '170px'
        },
        {
          column: orders.shipVia,
          width: '150px',
          valueList: getValueList( this.context.for(models.Shippers)),
        },
        orders.employeeID,
        orders.requiredDate,
        orders.shippedDate,
        orders.freight,
        orders.shipName,
        orders.shipAddress,
        orders.shipCity,
        orders.shipRegion,
        orders.shipPostalCode,
        orders.shipCountry,

      ],
      rowButtons: [
        {
          click: orders =>
            window.open(
              '/home/print/' + orders.id.value),
          icon: 'print'
        }
      ],
    }
  );
  shipInfoArea = this.ordersGrid.addArea({
    numberOfColumnAreas: 2,
    columnSettings: orders => [
      orders.requiredDate,
      orders.shippedDate,
      orders.shipAddress,
      orders.shipCity
    ]
  });
  orderDetailsGrid =new GridSettings( this.context.for(models.OrderDetails),{
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true,

    columnSettings: order_details => [
      {
        column: order_details.productID,
        width: '250px',
        valueList: getValueList( this.context.for(models.Products))
      }, {
        column: order_details.unitPrice,
        width: '100px'
      },
      {
        column: order_details.quantity, width: '100px'
      },
      {
        caption: 'Total',
        width: '100px',
        getValue: orderDetails =>
          (orderDetails.quantity.value * orderDetails.unitPrice.value).toFixed(2)
      }
    ],
    newRow: orderDetail => {
      orderDetail.orderID.value = this.ordersGrid.currentRow.id.value;
      orderDetail.quantity.value = 1;
    },

  });
  getOrderTotal() {
    let result = 0;
    this.orderDetailsGrid.items.forEach(
      orderDetail =>
        result += orderDetail.quantity.value * orderDetail.unitPrice.value);
    return result.toFixed(2);
  }
  printCurrentOrder() {
    window.open(
      '/home/print/' + this.ordersGrid.currentRow.id.value);
  }

}

