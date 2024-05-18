import { useState } from 'react'
import { IdValueSelect } from './task-table/id-value-select'
import { Customers } from '../model-remult/customer'
import { selectFrom } from './form-group/selectFrom'
import FormGroup from './form-group/form-group'
import CustomerTable from '../app/customer-table'
import OrdersTable from '../app/orders-table'

export default function Test() {
  return <OrdersTable />
}
