import {
  ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table'
import React, { useEffect, useMemo } from 'react'

import RowActions from '../../components/data-table/data-table-row-actions'
import useQuestion from '../../components/dialog/useQuestion'
import { FieldConfig } from '../../components/form-group/form-group'
import { useFormDialog } from '../../components/useFormDialog'
import { DataApi, EntityWithId } from './data-api-for'
import { buildColumns, buildFilterColumns } from './data-api-table-utils'

export function useDataApiReactTable<T extends EntityWithId>(
  dataApi: DataApi<T>,
  options: {
    columns: (string & keyof T)[]
    rowActions?: { text: string; onClick: (item: T) => void }[]
  }
) {
  const [refresh, setRefresh] = React.useState({})
  const [columnFilters, onColumnFiltersChange] =
    React.useState<ColumnFiltersState>([])
  const [data, setData] = React.useState<T[]>([])
  const [rowCount, setRowCount] = React.useState(0)
  const [{ pageIndex, pageSize }, onPaginationChange] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
  const [sorting, onSortingChange] = React.useState<SortingState>([])
  const where = React.useMemo(() => {
    const where: any = {}
    for (const { id, value } of columnFilters) {
      //@ts-expect-error typing unknown stuff
      const filterObject = value?.[0]
      const contains = filterObject.$contains
      if (contains) {
        where[id + '.contains'] = contains
      }
    }
    return where
  }, [JSON.stringify(columnFilters)])

  useEffect(() => {
    dataApi.count(where).then(setRowCount)
  }, [where, refresh])
  useEffect(() => {
    const _sort = sorting.map((x) => x.id).join(',')
    const _order = sorting.map((x) => (x.desc ? 'desc' : 'asc')).join(',')
    dataApi
      .getMany({
        _limit: pageSize,
        _page: pageIndex + 1,
        ...where,
        ...(sorting?.length > 0
          ? {
              _sort,
              _order,
            }
          : {}),
      })
      .then(setData)
  }, [pageIndex, pageSize, sorting, where, refresh])
  const replaceRow = (originalRow: T, newRow: T) => {
    setData((data) => data.map((row) => (row === originalRow ? newRow : row)))
  }

  const removeRow = (row: T) => {
    setData((data) => data.filter((r) => r !== row))
    setRowCount(rowCount - 1)
  }
  const columns = useMemo(() => {
    return [
      ...buildColumns(dataApi, ...options.columns),
      {
        id: 'actions',
        cell: function Cell({ row }) {
          const question = useQuestion()
          const form = useFormDialog()
          return RowActions({
            actions: [
              {
                text: 'Edit',
                onClick: () => {
                  form({
                    title: 'Edit',
                    defaultValues: row.original,
                    fields: dataApi.toFields(...options.columns) as any,
                    onOk: async (val) => {
                      replaceRow(
                        row.original,
                        await dataApi.put(row.original.id!, val as T)
                      )
                    },
                  })
                },
              },
              {
                text: 'Delete',
                onClick: async () => {
                  if (
                    await question({
                      title: 'Delete',
                      description: 'Are you sure you want to delete?',
                    })
                  ) {
                    await dataApi.delete((row.original as any).id)
                    removeRow(row.original)
                  }
                },
              },
              ...(options.rowActions ?? []).map((action) => ({
                text: action.text,
                onClick: () => action.onClick(row.original),
              })),
            ],
          })
        },
      } satisfies ColumnDef<T>,
    ]
  }, [JSON.stringify(options.columns)])
  const filterFields = useMemo(
    () => buildFilterColumns(dataApi, ...options.columns),
    [JSON.stringify(options.columns)]
  )
  return {
    tableProps: {
      data,
      rowCount,
      state: {
        columnFilters,
        sorting,
        pagination: { pageIndex, pageSize },
      },
      onPaginationChange,
      onSortingChange,
      onColumnFiltersChange,
      manualPagination: true,
      manualSorting: true,
      manualFiltering: true,
      columns,
    },
    filterFields,

    addRow: (row: T) => {
      setData((data) => [row, ...data])
      setRowCount(rowCount + 1)
    },

    reloadData: () => {
      setRefresh({})
    },
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    fieldConfig?: FieldConfig
  }
}
