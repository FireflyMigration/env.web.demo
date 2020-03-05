import { Component, OnInit } from '@angular/core';
import * as models from './../models';
import * as radweb from '@remult/core';
import { environment } from '../../environments/environment';

import { Context, BusyService, Column, Entity, IDataSettings } from '@remult/core';
import { SelectPopupComponent, columnWithSelectPopupAndGetValue } from '../common/select-popup/select-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private context: Context, private busyService: BusyService) {

  }

  ordersGrid = this.context.for(models.Orders).gridSettings(
    {
      get: {
        limit: 25
      },

      numOfColumnsInGrid: 4,
      allowUpdate: true,
      hideDataArea: true,
      allowInsert: true,
      onEnterRow: orders => {
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
          valueList: this.context.for(models.Shippers).getValueList()
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
  orderDetailsGrid = this.context.for(models.OrderDetails).gridSettings({
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true,

    columnSettings: order_details => [
      {
        column: order_details.productID,
        width: '250px',
        valueList: this.context.for(models.Products).getValueList()
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
    onNewRow: orderDetail => {
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

