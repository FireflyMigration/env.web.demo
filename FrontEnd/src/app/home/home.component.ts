import { Component, OnInit } from '@angular/core';
import * as models from './../models';
import * as radweb from 'radweb';
import { environment } from '../../environments/environment';
import { SelectService } from '../common/select-popup/select-popup.component';
import { Context } from 'radweb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private selectService: SelectService, private context: Context) {

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
      onEnterRow: orders =>
        this.orderDetailsGrid.get({
          where: orderDetails =>
            orderDetails.orderID.isEqualTo(orders.id),
          limit: 50
        }),
      columnSettings: orders => [
        {
          column: orders.id,
          width: '90px',
          readonly: true,
        },
        {
          column: orders.customerID,
          width: '400px',
          getValue: orders =>
            this.context.for(models.Customers).lookup(orders.customerID).companyName,
          click: orders =>
            this.selectService.show(new models.Customers(), c => {
              orders.customerID.value = c.id.value
            }, {
              numOfColumnsInGrid: 4,
              columnSettings: customers => [
                customers.id,
                customers.companyName,
                customers.contactName,
                customers.country,
                customers.address,
                customers.city
              ]
            })

        },
        {
          column: orders.orderDate,
          width: '170px'
        },
        {
          column: orders.shipVia,
          width: '150px',
          dropDown: {
            source: this.context.for(models.Shippers).create()
          }
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
          cssClass: 'btn btn-primary glyphicon glyphicon-print'
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
        dropDown: {
          source: this.context.for( models.Products).create()
        }
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
