import { ColumnDef } from '@tanstack/react-table'
import { DataApi } from './data-api-for'
import { DataTableColumnHeader } from '../../components/data-table/data-table-column-header'
import { DataTableFilterField } from '../../types'
import { useEffect, useState } from 'react'

export function buildColumns<entityType>(
  api: DataApi<entityType>,
  ...fields: (string & keyof entityType)[]
): ColumnDef<entityType, unknown>[] {
  return api.mapFields(...fields).map((field) => {
    return {
      accessorKey: field.key,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field.caption} />
      ),
      cell: (info) => {
        const [val, setVal] = useState('')
        useEffect(() => {
          ;(async () => {
            setVal(await field.displayValue(info.getValue()))
          })()
        }, [info.getValue()])
        return <div className="w-40 truncate"> {val}</div>
      },
      meta: {
        fieldConfig: field,
      },
    }
  })
}

export function buildFilterColumns<entityType>(
  api: DataApi<entityType>,
  ...fields: (string & keyof entityType)[]
): DataTableFilterField<entityType>[] {
  return api
    .mapFields(...fields)
    .filter((x) => x.type === 'text')
    .map((field) => ({
      caption: field.caption,
      key: field.key as keyof entityType,
      placeholder: field.caption,
    }))
}
