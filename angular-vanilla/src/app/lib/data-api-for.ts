import {
  fieldConfigFor,
  type FieldConfig,
  type FieldsConfig,
} from './field-config';
import { capitalize } from './utils';

export type EntityWithId = { id?: string | number };

export function dataApiFor<T extends EntityWithId>(
  key: string,
  options?: {
    fieldsConfig: FieldsConfig<T>;
  }
) {
  const { toFields, toFieldsArray } = fieldConfigFor<T>(
    options?.fieldsConfig ?? {}
  );

  return {
    key,
    async count(where?: DataApiWhere<T>) {
      return (await dataApiGet(key, { ...where, __action: 'count' }))
        .count as number;
    },
    async getMany(
      options: Omit<DataApiRequest, '__action'> & { where?: DataApiWhere<T> }
    ) {
      const { where, ...op } = options;
      return (await dataApiGet(key, { ...op, ...where })) as T[];
    },
    async post(item: T) {
      return postOrPut<T>('', 'POST', item);
    },
    async put(id: string | number, item: T) {
      return postOrPut<T>('/' + id, 'PUT', item);
    },
    async delete(id: string) {
      await fetch(dataApiUrl + key + '/' + id, { method: 'DELETE' });
    },

    toFields,
    toFieldsArray,
  };

  function postOrPut<T>(slashId: string, method: 'POST' | 'PUT', item: T) {
    return fetch(dataApiUrl + key + slashId, {
      method,
      body: JSON.stringify(item),
    }).then(async (x) => {
      const j = await x.json();
      if (x.ok) return j as T;
      const resultError = {
        message: j.message ?? j.Message,
        errors: {} as Record<string, string>,
      };
      if (j.ModelState)
        for (const key in j.ModelState) {
          if (Object.prototype.hasOwnProperty.call(j.ModelState, key)) {
            const error = j.ModelState[key];
            if (error?.length > 0) resultError.errors[key] = error[0];
          }
        }
      throw new EntityError<T>(resultError);
    });
  }
}

export type DataApi<T extends EntityWithId> = ReturnType<typeof dataApiFor<T>>;

export const dataApiUrl = '/dataApi/';

export type DataApiRequest = {
  __action?: 'count';
  _limit?: number;
  _page?: number;
  _sort?: string;
  _order?: string;
};
export type DataApiWhere<T> = {
  [p in keyof T]?: string;
};
export async function dataApiGet(key: string, params: DataApiRequest) {
  return fetch(
    dataApiUrl +
      key +
      '?' +
      new URLSearchParams(
        //@ts-ignore
        params
      ).toString()
  ).then((x) => x.json());
}

export class EntityError<entityType = unknown> extends Error {
  constructor(errorInfo: any) {
    super(errorInfo.message);
    Object.assign(this, errorInfo);
  }
  errors?: {
    [Properties in keyof Partial<entityType>]?: string;
  };
}
