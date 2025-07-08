import type { DataApi, EntityWithId } from './data-api-for';
import type { FieldConfig } from './field-config';

export function selectFrom<T extends EntityWithId>(
  api: DataApi<T>,
  descriptionField: keyof T
) {
  return {
    type: 'selectId',
    getOptions: async (search) =>
      (
        await api.getMany({
          //@ts-ignore
          where: {
            //@ts-ignore
            [descriptionField + '.contains']: search,
          },
          _limit: 25,
        })
      ).map((item) => ({
        //@ts-ignore
        id: item.id!,
        caption: item[descriptionField]?.toString() ?? '',
      })),
    displayValue: async (id: any) =>
      (
        await api.getMany({
          //@ts-ignore
          where: { id },
        })
      )?.[0]?.[descriptionField]?.toString() || '',
  } satisfies IdSelectFieldConfig & Partial<FieldConfig>;
}
export type IdSelectFieldConfig = {
  type: 'selectId';
  getOptions: (
    search: string
  ) => Promise<{ id: string | number; caption: string }[]>;
};
