import {
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table'
import React, { useEffect, useMemo } from 'react'

export function useDataApiReactTable<entityType>(
  dataApi: DataApi<entityType>,
  options: {
    columns: (string & keyof entityType)[]
  }
) {
  const [refresh, setRefresh] = React.useState({})
  const [columnFilters, onColumnFiltersChange] =
    React.useState<ColumnFiltersState>([])
  const [data, setData] = React.useState<entityType[]>([])
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
      .find({
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
  const columns = useMemo(() => {
    return buildColumns(dataApi, ...options.columns)
  }, [options.columns])
  const filterFields = useMemo(
    () => buildFilterColumns(dataApi, ...options.columns),
    [options.columns]
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

    addRow: (row: entityType) => {
      setData((data) => [row, ...data])
      setRowCount(rowCount + 1)
    },

    replaceRow: (originalRow: entityType, newRow: entityType) => {
      setData((data) => data.map((row) => (row === originalRow ? newRow : row)))
    },

    removeRow: (row: entityType) => {
      setData((data) => data.filter((r) => r !== row))
      setRowCount(rowCount - 1)
    },

    reloadData: () => {
      setRefresh({})
    },
  }
}

import '@tanstack/react-table'
import { FieldConfig } from '../../components/form-group/form-group'
import { DataApi, DataApiWhere } from './data-api-for'
import { buildColumns, buildFilterColumns } from './data-api-table-utils'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    fieldConfig?: FieldConfig
  }
}
