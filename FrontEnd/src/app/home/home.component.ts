import { Component, OnInit } from '@angular/core';
import * as models from './../models';

import { Context } from '@remult/core';
import { SelectPopupComponent } from '../common/select-popup/select-popup.component';
import { BusyService, getValueList, GridSettings, openDialog } from '@remult/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private context: Context, private busyService: BusyService) {

  }

  ordersGrid = new GridSettings(this.context.for(models.Orders),
    {
      rowsInPage: 50,

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
        {
          column: orders.customerID,
          getValue: (order) => this.context.for(models.Customers).lookup(c => c.id.isEqualTo(order.customerID)).companyName,
          click: (order) =>
            openDialog(SelectPopupComponent,
              popup => popup.config(this.context.for(models.Customers),
                {
                  onSelect: selected => { order.customerID = selected.id }
                }))
        },

        {
          column: orders.orderDate,
          width: '170px'
        },
        {
          column: orders.shipVia,
          width: '150px',
          valueList: getValueList(this.context.for(models.Shippers)),
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
    columnSettings: orders => [
      orders.requiredDate,
      orders.shippedDate,
      orders.shipAddress,
      orders.shipCity
    ]
  });
  orderDetailsGrid = new GridSettings(this.context.for(models.OrderDetails), {
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true,

    columnSettings: order_details => [
      {
        column: order_details.productID,
        width: '250px',
        valueList: getValueList(this.context.for(models.Products))
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

