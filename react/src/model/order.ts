import { dataApiFor } from '../lib/env-web/data-api-for'
import { selectFrom } from '../lib/env-web/select-from'
import { customerApi } from './customer'

export interface Order {
  id?: number
  customerID?: string
  employeeID?: number
  orderDate?: string
  requiredDate?: string
  shippedDate?: string
  shipVia?: number
  freight?: number
  shipName?: string
  shipAddress?: string
  shipCity?: string
  shipRegion?: string
  shipPostalCode?: string
  shipCountry?: string
}

export const orderApi = dataApiFor<Order>('orders', {
  fieldsConfig: {
    orderDate: {
      type: 'date',
    },
    requiredDate: {
      type: 'date',
    },
    shippedDate: {
      type: 'date',
    },
    customerID: {
      ...selectFrom(customerApi, 'companyName'),
      caption: 'Customer',
    },
  },
})
