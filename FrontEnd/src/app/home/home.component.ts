import { Component, OnInit } from '@angular/core';
import * as models from './../models';
import * as radweb from 'radweb';

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
      numOfColumnsInGrid: 4,
      allowUpdate: true,
      allowDelete: true,
      allowInsert: true,
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
        orders.requiredDate,
        orders.shippedDate,
        orders.shipAddress,
        orders.shipCity,
      ]
    }
  );
}
