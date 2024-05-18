import { DataTable } from '@/components//data-table/data-table.tsx'

import { getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { orderApi } from '../model/order'
import { useDataApiReactTable } from '../lib/env-web/use-data-api-react-table'

export default function OrdersTable() {
  const t = useDataApiReactTable(orderApi, {
    columns: ['id', 'customerID'],
  })

  const table = useReactTable({
    ...t.tableProps,

    getCoreRowModel: getCoreRowModel(),
  })

  return <DataTable table={table} filterFields={t.filterFields}></DataTable>
}
