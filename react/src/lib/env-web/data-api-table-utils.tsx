import { ColumnDef } from '@tanstack/react-table'
import { Repository, getValueList } from 'remult'
import { DataApi } from './data-api-for'
import { DataTableColumnHeader } from '../../components/data-table/data-table-column-header'
import { DataTableFilterField } from '../../types'

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
      cell: (info) => (
        <div className="w-20"> {info.getValue()?.toString()}</div>
      ),
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
  return api.mapFields(...fields).map((field) => ({
    caption: field.caption,
    key: field.key as keyof entityType,
    placeholder: field.caption,
  }))
}
