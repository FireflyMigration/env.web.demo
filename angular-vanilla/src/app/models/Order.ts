import { dataApiFor } from '../lib/data-api-for';
import { selectFrom } from '../lib/select-from';
import { customersApi } from './Customer';

export interface Order {
  id?: number;
  customerID?: string;
  employeeID?: number;
  orderDate?: string;
  requiredDate?: string;
  shippedDate?: string;
  shipVia?: number;
  freight?: number;
  shipName?: string;
  shipAddress?: string;
  shipCity?: string;
  shipRegion?: string;
  shipPostalCode?: string;
  shipCountry?: string;
}

export const ordersApi = dataApiFor<Order>('orders', {
  fieldsConfig: {
    orderDate: { type: 'date' },
    customerID: {
      label: 'Customer',
      ...selectFrom(customersApi, 'companyName'),
    },
  },
});
ordersApi.getMany({ _order: 'asc', _sort: 'orderDate' });
