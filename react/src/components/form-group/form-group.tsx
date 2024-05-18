import { Label } from '../ui/label.tsx'
import { capitalize } from '../../lib/utils.ts'
import { CheckboxInput, NormalInput } from './NormalInput.tsx'
import { useMemo, useState } from 'react'
import { selectFrom } from './selectFrom.tsx'
import { Customers } from '../../model-remult/customer.ts'
import {
  IdSelectValueType,
  IdValueSelect,
} from '../task-table/id-value-select.tsx'

type FieldConfig = (
  | { type: 'text' | 'number' | 'checkbox' }
  | ({ type: 'selectId' } & IdSelectValueType)
) & {
  caption: string
  key: string
}

const config: Record<string, Partial<FieldConfig>> = {
  title: { type: 'text', caption: 'Title', key: 'title' },
  name: {},
  lastName: {},
  age: {
    type: 'number',
  },
  active: {
    type: 'checkbox',
  },
  customer: {
    type: 'selectId',
    ...selectFrom(Customers),
  },
}
export type FieldInGroupProps = {
  field: FieldConfig
  value: string
  setValue: (newValue: string) => void
}

export default function FormGroup() {
  const [state, setState] = useState<Record<string, string>>({})

  const fields = useMemo(() => {
    const result: FieldConfig[] = []
    for (const key in config) {
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        const element = config[key]
        result.push({
          type: 'text',
          caption: capitalize(key),
          key,
          ...element,
        } as any)
      }
    }
    return result
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field) => {
        const args: FieldInGroupProps = {
          field,
          value: state[field.key] || '',
          setValue: (value) => setState({ ...state, [field.key]: value }),
        }
        function RenderField() {
          if (field.type)
            switch (field.type) {
              case 'selectId':
                return <IdValueSelect {...args} {...field} />
              case 'checkbox':
                return <CheckboxInput {...args} />
              default:
                return <NormalInput {...args} />
            }
        }

        return (
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor={field.key}>{field.caption}</Label>
            {RenderField()}
          </div>
        )
      })}
      <pre>{JSON.stringify(state, undefined, 2)}</pre>
    </div>
  )
}
