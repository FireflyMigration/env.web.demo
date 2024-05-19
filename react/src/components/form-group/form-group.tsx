import { Label } from '../ui/label.tsx'
import { capitalize } from '../../lib/utils.ts'
import { CheckboxInput, NormalInput } from './NormalInput.tsx'
import { useMemo } from 'react'

import {
  IdSelectValueType,
  IdValueSelect,
} from '../task-table/id-value-select.tsx'

export type FieldConfig = (
  | { type: 'text' | 'number' | 'checkbox' | 'date' }
  | IdSelectValueType
) & {
  caption: string
  key: string
  displayValue: (val: any) => string | Promise<string>
}

export type FieldInGroupProps = {
  field: FieldConfig
  value: string
  setValue: (newValue: string) => void
}

export default function FormGroup(props: {
  fields: Record<string, Partial<FieldConfig>>
  state: Record<string, string>
  setState: (newState: Record<string, string>) => void
}) {
  const fields = useMemo(() => {
    const result: FieldConfig[] = []
    for (const key in props.fields) {
      if (Object.prototype.hasOwnProperty.call(props.fields, key)) {
        const element = props.fields[key]
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
          value: props.state[field.key] || '',
          setValue: (value) =>
            props.setState({ ...props.state, [field.key]: value }),
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
      {/* <pre>{JSON.stringify(props.state, undefined, 2)}</pre> */}
    </div>
  )
}
