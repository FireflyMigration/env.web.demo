import { Component, inject } from '@angular/core';
import {
  DataGridComponent,
  DataGridSettings,
} from '../lib/data-grid/data-grid.component';
import { ordersApi, type Order } from '../models/Order';
import { openPdf } from '../lib/data-api-for';
import { UIService } from '../lib/ui.service';

@Component({
  selector: 'app-orders',
  imports: [DataGridComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  ui = inject(UIService);
  grid = new DataGridSettings(ordersApi, {
    columns: ['id', 'customerID', 'orderDate', 'shipVia'],
    rowActions: [
      {
        text: 'Print',
        icon: 'print',
        onClick: (item) => {
          openPdf('home/print', { id: item.id });
        },
      },
      {
        text: 'Edit',
        onClick: (item) => {
          this.ui.formDialog<Order>({
            fieldsConfig: ordersApi.toFields('customerID', 'orderDate'),
            defaultValues: item,
            onSubmit: async (order) => {
              await ordersApi.put(item.id!, order);
              this.grid.loadData();
            },
            title: 'Edit Order',
          });
        },
        icon: 'edit',
      },
    ],
  });
}
