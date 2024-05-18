import { FieldConfig } from '../../components/form-group/form-group'
import { capitalize } from '../utils'

export function dataApiFor<T>(key: string) {
  function mapFields(...fields: (string & keyof T)[]) {
    const result: FieldConfig[] = []
    for (const key of fields) {
      result.push({
        type: 'text',
        caption: capitalize(key),
        key,
        //...element,
      } as any)
    }
    return result
  }
  return {
    key,
    async count(where?: DataApiWhere<T>) {
      return (await dataApiGet(key, { ...where, __action: 'count' }))
        .count as number
    },
    async find(options: Omit<DataApiRequest<T>, '__action'>) {
      return (await dataApiGet(key, options)) as T[]
    },
    mapFields,
  }
}

export type DataApi<T> = ReturnType<typeof dataApiFor<T>>

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
export async function dataApiGet<T>(key: string, params: DataApiRequest<T>) {
  return fetch(
    dataApiUrl +
      key +
      '?' +
      new URLSearchParams(
        //@ts-ignore
        params
      ).toString()
  ).then((x) => x.json())
}
