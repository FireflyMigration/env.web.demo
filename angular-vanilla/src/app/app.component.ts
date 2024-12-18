import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NoamTestComponent } from './noam-test/noam-test.component';
import {
  DynamicFormSettings,
  DynamicFormComponent,
} from './lib/dynamic-form/dynamic-form.component';
import { MatCardModule } from '@angular/material/card';
import {
  DataGridSettings,
  DataGridComponent,
} from './lib/data-grid/data-grid.component';
import { ordersApi, type Order } from './models/Order';
import { UIService } from './lib/ui.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NoamTestComponent,
    DynamicFormComponent,
    MatCardModule,
    DataGridComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  ui = inject(UIService);

  ngOnInit() {
    this.ui.formDialog<Order>({
      title: 'Login',
      fieldsConfig: ordersApi.toFields(
        'id',
        'customerID',
        'orderDate',
        'shipVia'
      ),

      onSubmit: async (val) => {
        await ordersApi.post(val);
      },
    });
  }

  login = new DynamicFormSettings<SignInInfo>({
    fieldsConfig: {
      username: {},
      password: { type: 'password' },
    },
    defaultValues: { username: 'noam', password: '1234' },
    onSubmit: async (val) => {
      console.log('submitting', val);
    },
  });
  grid = new DataGridSettings(ordersApi, {
    columns: ['id', 'customerID', 'orderDate', 'shipVia'],
    rowActions: [
      {
        text: 'Edit',
        onClick: (item) => {
          this.ui.yesNoQuestion(item.customerID!);
          console.log('edit', item);
        },
        icon: 'edit',
      },
    ],
  });
}

type SignInInfo = {
  username: string;
  password: string;
};
