import {
  type ColumnFiltersState,
  type PaginationState,
  type RowData,
  type SortingState,
} from '@tanstack/react-table'
import React, { useEffect } from 'react'
import type { FieldMetadata, Repository, ValueFilter } from 'remult'

export function useEnvWebReactTable<entityType>(
  config: EntityConfig<entityType>
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
    const where: DataApiWhere<entityType> = {}
    for (const { id, value } of columnFilters) {
      //@ts-expect-error typing unknown stuff
      where[id] = value?.[0] as ValueFilter<any>
    }
    return where
  }, [JSON.stringify(columnFilters)])

  useEffect(() => {
    dataApiGet(config, {
      __action: 'count',
      ...where,
    }).then((x: { count: number }) => setRowCount(x.count))
  }, [where, refresh])
  useEffect(() => {
    const _sort = sorting.map((x) => x.id).join(',')
    const _order = sorting.map((x) => x.desc).join(',')

    dataApiGet(config, {
      _limit: pageSize,
      _page: pageIndex + 1,
      ...where,
      ...(sorting?.length > 0
        ? {
            _sort,
            _order,
          }
        : {}),
    }).then((rows: entityType[]) => setData(rows))
  }, [pageIndex, pageSize, sorting, where, refresh])
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
    },
    /** disabled and not needed in live query */
    addRow: (row: entityType) => {
      setData((data) => [row, ...data])
      setRowCount(rowCount + 1)
    },
    /** disabled and not needed in live query */
    replaceRow: (originalRow: entityType, newRow: entityType) => {
      setData((data) => data.map((row) => (row === originalRow ? newRow : row)))
    },
    /** disabled and not needed in live query */
    removeRow: (row: entityType) => {
      setData((data) => data.filter((r) => r !== row))
      setRowCount(rowCount - 1)
    },
    /** disabled and not needed in live query */
    reloadData: () => {
      setRefresh({})
    },
  }
}
export function fieldsOf<entityType>(
  repo: Repository<entityType>,
  ...fields: (string & keyof entityType)[]
) {
  return fields
    ? fields.map((key) => repo.fields.find(key))
    : repo.fields.toArray().filter((x) => x.key != 'id')
}

import '@tanstack/react-table'
import { EntityConfig } from '../model/order'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    field?: FieldMetadata<TValue, TData>
  }
}
export const dataApiUrl = '/dataApi/'

export type DataApiRequest<T> = {
  __action?: 'count'
  _limit?: number
  _page?: number
  _sort?: string
  _order?: string
} & DataApiWhere<T>
export type DataApiWhere<T> = {
  [p in keyof T]?: string
}
export async function dataApiGet<T>(
  config: EntityConfig<T>,
  params: DataApiRequest<T>
) {
  return fetch(
    dataApiUrl +
      config.key +
      '?' +
      new URLSearchParams(
        //@ts-ignore
        params
      ).toString()
  ).then((x) => x.json())
}
