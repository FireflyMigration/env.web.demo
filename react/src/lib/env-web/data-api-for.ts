import { FieldConfig } from '../../components/form-group/form-group'

import { capitalize } from '../utils'

export function dataApiFor<T>(
  key: string,
  options?: {
    fieldsConfig: {
      [P in keyof T]?: Partial<FieldConfig>
    }
  }
) {
  function toFieldsArray(...fields: (string & keyof T)[]) {
    const result: FieldConfig[] = []
    for (const key of fields) {
      let basic = {
        type: 'text',
        caption: capitalize(key),
        key,
        displayValue: (x) => x,
      } as FieldConfig
      let field = options?.fieldsConfig[key]
      if (field?.type === 'date') {
        basic.displayValue = (d) => new Date(d?.toString()).toLocaleDateString()
      }
      //@ts-ignore
      result.push({ ...basic, ...field })
    }
    return result
  }

  return {
    key,
    async count(where?: DataApiWhere<T>) {
      return (await dataApiGet(key, { ...where, __action: 'count' }))
        .count as number
    },
    async getMany(
      options: Omit<DataApiRequest, '__action'> & { where?: DataApiWhere<T> }
    ) {
      const { where, ...op } = options
      return (await dataApiGet(key, { ...op, ...where })) as T[]
    },
    async post<T>(item: T) {
      return fetch(dataApiUrl + key, {
        method: 'POST',
        body: JSON.stringify(item),
      }).then(async (x) => {
        const j = await x.json()
        if (x.ok) return j as T
        const resultError = {
          message: j.message ?? j.Message,
          errors: {} as Record<string, string>,
        }
        if (j.ModelState)
          for (const key in j.ModelState) {
            if (Object.prototype.hasOwnProperty.call(j.ModelState, key)) {
              const error = j.ModelState[key]
              if (error?.length > 0) resultError.errors[key] = error[0]
            }
          }
        throw resultError
      })
    },
    toFieldsArray,
    toFields(...fields: (string & keyof T)[]) {
      return toFieldsArray(...fields).reduce(
        (a, b) => ({ ...a, [b.key as keyof T]: b }),
        {}
      )
    },
  }
}

export type DataApi<T> = ReturnType<typeof dataApiFor<T>>

export const dataApiUrl = '/dataApi/'

export type DataApiRequest = {
  __action?: 'count'
  _limit?: number
  _page?: number
  _sort?: string
  _order?: string
}
export type DataApiWhere<T> = {
  [p in keyof T]?: string
}
export async function dataApiGet<T>(key: string, params: DataApiRequest) {
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
