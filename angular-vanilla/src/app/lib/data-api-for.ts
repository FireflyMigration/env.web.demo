import { fieldConfigFor, type FieldsConfig } from './field-config';

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
      return (
        await dataApiGet(key, { ...buildWhere(where), __action: 'count' })
      ).count as number;
    },
    async getMany(
      options: Omit<DataApiRequest, '__action'> & { where?: DataApiWhere<T> }
    ) {
      const { where, ...op } = options;
      return (await dataApiGet(key, { ...op, ...buildWhere(where) })) as T[];
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

export async function postApi<returnType>(
  url: string,
  body?: any
): Promise<returnType> {
  return fetch(appApiUrl + url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : '',
  }).then((response) => {
    if (response.ok) {
      if (response.headers.get('Content-Length') === '0') return null;
      return response.json();
    } else throw new Error(response.statusText);
  });
}
export function openPdf(url: string, params?: any) {
  let theUrl = appApiUrl + url;
  if (params) {
    theUrl += '?' + new URLSearchParams(params).toString();
  }
  window.open(theUrl, '_blank');
}

export type DataApi<T extends EntityWithId> = ReturnType<typeof dataApiFor<T>>;

export const dataApiUrl = '/dataApi/',
  appApiUrl = '/appApi/';

export type DataApiRequest = {
  __action?: 'count';
  _limit?: number;
  _page?: number;
  _sort?: string;
  _order?: string;
};

export type DataApiWhere<T> = {
  [p in keyof T]?: T[p] extends string | undefined
    ? ComparisonFilter<T[p]> | { contains?: string } | T[p]
    : T[p] extends number | undefined
    ? ComparisonFilter<T[p]> | T[p]
    : T[p];
};
export interface ComparisonFilter<T> {
  gt?: T;
  gte?: T;
  lt?: T;
  lte?: T;
  ne?: T;
}

interface testWhere {
  s1?: string;
  s2?: string;
  s3?: string;
  n1?: number;
  n2?: number;
  n3?: number;
  b1?: boolean;
  b2?: boolean;
}
let test: DataApiWhere<testWhere> = {
  s1: 'a',
  s2: { gt: 'a' },
  s3: { contains: 'a' },
  n1: 1,
  //@ts-expect-error
  n2: '1',
  n3: { gt: 1 },
  b1: true,
};

function buildWhere<T>(filter?: DataApiWhere<T>) {
  let result: any = {};
  for (const key in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, key)) {
      const element = filter[key];
      if (typeof element === 'object') {
        for (const op in element) {
          if (Object.prototype.hasOwnProperty.call(element, op)) {
            const value = element[op];
            result[key + '.' + op] = value;
          }
        }
      } else result[key] = element;
    }
  }
  return result;
}
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
