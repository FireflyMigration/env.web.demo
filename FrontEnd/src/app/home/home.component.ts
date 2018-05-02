import { Component, OnInit } from '@angular/core';
import * as models from './../models';
import * as radweb from 'radweb';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectCustomerGrid = new radweb.GridSettings(new models.Customers(),
  {
    
    numOfColumnsInGrid:4,
    columnSettings: customers => [
      customers.id,
      customers.companyName,
      customers.contactName,
      customers.country,
      customers.address,
      customers.city
    ]
  });
  ordersGrid = new radweb.GridSettings(new models.Orders(),
    {
      get:{
        limit:4
      },
      numOfColumnsInGrid: 4,
      allowUpdate: true,
      
      allowInsert: true,
      onEnterRow: orders =>
      this.orderDetailsGrid.get({
        where: orderDetails =>
          orderDetails.orderID.isEqualTo(orders.id)
      }),
      columnSettings: orders => [
        {
          column: orders.id,
          readonly: true
        },
        {
          column: orders.customerID,
          getValue: orders =>
            orders.lookup(new models.Customers(), orders.customerID).companyName,
          click: orders =>
            this.selectCustomerGrid.showSelectPopup(
              selectedCustomer =>
                orders.customerID.value = selectedCustomer.id.value)
        },
        orders.orderDate,
        {
          column: orders.shipVia,
          dropDown: {
            source: new models.Shippers()
          }
        },
     
      ],
      rowButtons: [
        {
          click: orders =>
            window.open(
              environment.serverUrl + 'home/print/' + orders.id.value),
          cssClass: 'btn btn-primary glyphicon glyphicon-print'
        }
      ],
    }
  );
  shipInfoArea = this.ordersGrid.addArea({
    numberOfColumnAreas:2,
    columnSettings: orders => [
      orders.requiredDate,
      orders.shippedDate,
      orders.shipAddress,
      orders.shipCity
    ]
  });
  orderDetailsGrid = new radweb.GridSettings(new models.OrderDetails(),
  {
    allowUpdate: true,
    allowDelete: true,
    allowInsert: true,
    columnSettings: order_details => [
      {
        column: order_details.productID,
        dropDown: {
          source: new models.Products()
        }
      },
      order_details.unitPrice,
      order_details.quantity,
      {
        caption: 'Total',
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
      environment.serverUrl + 'home/print/' + this.ordersGrid.currentRow.id.value);
  }
  
}
