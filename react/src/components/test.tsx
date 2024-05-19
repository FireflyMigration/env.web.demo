import { Customers } from '../model-remult/customer'
import { Button } from './ui/button'
import { selectFrom } from '../lib/env-web/select-from'
import { customerApi } from '../model/customer'
import { useFormDialog } from './useFormDialog'
import { orderApi } from '../model/order'
import CustomerTable from '../app/customer-table'

export default function Test() {
  return <CustomerTable />
}
// fix filtering of customer by name