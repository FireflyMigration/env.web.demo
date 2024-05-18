import { repo } from 'remult'
import {
  DataTable,
  selectColumn,
} from '@/components//data-table/data-table.tsx'
import { useMemo } from 'react'

import React from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRemultReactTableServerSidePagingSortingAndFiltering } from '../lib/use-remult-react-table'
import { Customers } from '../model-remult/customer'
import {
  buildColumns,
  buildFilterColumns,
} from '../components/data-table/data-table-remult-utils'

export const customerRepo = repo(Customers)
const fieldsOnTable: (keyof Customers)[] = [
  'id',
  'companyName',
  'contactName',
  'country',
  'city',
]
export default function CustomerTable() {
  const t = useRemultReactTableServerSidePagingSortingAndFiltering(
    customerRepo,
    {}
  )

  const columns = React.useMemo<ColumnDef<Customers>[]>(() => {
    return [
      selectColumn(),
      ...buildColumns(customerRepo, ...fieldsOnTable).map((c) =>
        c.meta?.field === customerRepo.fields.companyName
          ? ({
              ...c,
              cell: ({ row }) => (
                <div className="flex space-x-2">
                  <span className="max-w-[31.25rem] truncate font-medium">
                    {row.getValue(c.meta!.field!.key)}
                  </span>
                </div>
              ),
            } satisfies ColumnDef<Customers>)
          : c
      ),
      // {
      //   id: 'actions',
      //   cell: function Cell({ row }) {
      //     return TaskRowAction(row, t)
      //   },
      // } satisfies ColumnDef<Customers>,
    ]
  }, [])

  const table = useReactTable({
    ...t.tableProps,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const filterFields = useMemo(
    () => buildFilterColumns(customerRepo, ...fieldsOnTable),
    []
  )
  return (
    <DataTable table={table} filterFields={filterFields}>
      {/* <CreateTaskDialog onAdd={(newTask) => t.addRow(newTask)} /> */}
    </DataTable>
  )
}
