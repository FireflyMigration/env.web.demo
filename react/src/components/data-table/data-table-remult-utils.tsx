import { ColumnDef } from "@tanstack/react-table"
import { Repository, getValueList } from "remult"
import { fieldsOf } from "../../lib/remult-lib/use-remult-react-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableFilterField } from "../../types"

export function buildColumns<entityType>(
  repo: Repository<entityType>,
  ...fields: (string & keyof entityType)[]
): ColumnDef<entityType, unknown>[] {
  return fieldsOf(repo, ...fields).map((field) => {
    return {
      accessorKey: field.key,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={field.caption} />
      ),
      cell: (info) => (
        <div className="w-20"> {field.displayValue(info.row.original)}</div>
      ),
      meta: {
        field: field,
      },
    }
  })
}

export function buildFilterColumns<entityType>(
  repo: Repository<entityType>,
  ...fields: (string & keyof entityType)[]
): DataTableFilterField<entityType>[] {
  return fieldsOf(repo, ...fields).map((field) => ({
    caption: field.caption,
    key: field.key as keyof entityType,
    placeholder: field.caption,
    options: getValueList(field)?.map((value) =>
      typeof value === 'string'
        ? {
            caption: field.options.displayValue?.(undefined!, value) || value,
            id: value,
          }
        : {
            caption: value.caption,
            id: value.id,
          }
    ),
  }))
}
