import * as React from 'react'
import { Input } from '../ui/input.tsx'
import { FieldInGroupProps } from './form-group.tsx'
import { Checkbox } from '../ui/checkbox.tsx'

export function NormalInput({ field, value, setValue }: FieldInGroupProps) {
  return (
    <Input
      id={field.key}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={field.type}
    />
  )
}

export function CheckboxInput({ field, value, setValue }: FieldInGroupProps) {
  return (
    <Checkbox
      checked={value == 'true'}
      onCheckedChange={(e) => setValue(e.toString())}
    />
  )
}
