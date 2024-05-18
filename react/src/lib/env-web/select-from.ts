import { IdSelectValueType } from '../../components/task-table/id-value-select'
import { DataApi } from './data-api-for'

export function selectFrom<T extends { id?: string }>(
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
        id: item.id,
        caption: item[descriptionField],
      })),
    displayValue: async (id) =>
      (await api.getMany({ where: { id } }))?.[0]?.[
        descriptionField
      ]?.toString() || '',
  } satisfies IdSelectValueType
}
