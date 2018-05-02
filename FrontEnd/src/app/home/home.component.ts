import { Component, OnInit } from '@angular/core';
import * as models from './../models';
import * as radweb from 'radweb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ordersGrid = new radweb.GridSettings(new models.Orders(),
    {
      numOfColumnsInGrid: 4,
      columnSettings: orders => [
        {
          column: orders.id,
          readonly: true
        },
        orders.customerID,
        orders.orderDate,
        orders.shipVia,
        orders.requiredDate,
        orders.shippedDate,
        orders.shipAddress,
        orders.shipCity,
      ]
    }
  );
}
