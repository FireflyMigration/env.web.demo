import type { IdSelectFieldConfig } from './select-from';
import { capitalize, makeTitle } from './utils';

export type FieldConfig = (
  | {
      type:
        | 'text'
        | 'number'
        | 'checkbox'
        | 'date'
        | 'email'
        | 'select'
        | 'password';
    }
  | IdSelectFieldConfig
) & {
  label: string;
  key: string;
  displayValue: (val: any) => string | Promise<string | undefined>;
  required: boolean;
  options?: string[];
  defaultValue?: any;
  _nonPromiseDisplayValue?: (val: any) => string;
};

export type FieldsConfig<T> = {
  [P in keyof T]?: Partial<FieldConfig>;
};

export function fieldConfigFor<T>(fieldsConfig: FieldsConfig<T>) {
  function toFieldsArray(...fields: (string & keyof T)[]) {
    const result: FieldConfig[] = [];
    if (!fields.length) fields = Object.keys(fieldsConfig) as any;
    for (const key of fields) {
      let basic = {
        type: 'text',
        label: makeTitle(key),
        key,
        displayValue: (x) => x,
      } as FieldConfig;
      let field = fieldsConfig[key];
      if (field?.type === 'date') {
        basic.displayValue = (d) =>
          new Date(d?.toString()).toLocaleDateString();
      }

      //@ts-ignore
      result.push({ ...basic, ...field });
    }
    return result;
  }

  return {
    toFieldsArray,
    toFields(...fields: (string & keyof T)[]) {
      return toFieldsArray(...fields).reduce(
        (a, b) => ({ ...a, [b.key as keyof T]: b }),
        {}
      );
    },
  };
}
