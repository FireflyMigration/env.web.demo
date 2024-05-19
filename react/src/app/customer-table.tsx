import { DataTable } from '@/components//data-table/data-table.tsx'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useDataApiReactTable } from '../lib/env-web/use-data-api-react-table'
import { Customer, customerApi } from '../model/customer'
import { Button } from '../components/ui/button'
import { useFormDialog } from '../components/useFormDialog'

export default function CustomerTable() {
  const t = useDataApiReactTable(customerApi, {
    columns: ['id', 'companyName'],
  })

  const table = useReactTable({
    ...t.tableProps,

    getCoreRowModel: getCoreRowModel(),
  })
  const form = useFormDialog()

  return (
    <DataTable table={table} filterFields={t.filterFields}>
      <Button
        onClick={() => {
          form({
            fields: customerApi.toFields(
              'id',
              'companyName',
              'contactName'
            ) as any,
            onOk: async (customer: Customer) => {
              const result = await customerApi.post(customer)
              console.log(result)
            },
          })
        }}
      >
        Add Customer
      </Button>
    </DataTable>
  )
}
