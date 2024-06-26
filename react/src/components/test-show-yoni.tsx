import { selectFrom } from '../lib/env-web/select-from'
import { customerApi } from '../model/customer'
import { Button } from './ui/button'
import { useFormDialog } from './useFormDialog'

export default function TestShowYoni() {
  const form = useFormDialog()
  return (
    <Button
      onClick={() => {
        form({
          title: 'hello',

          fields: {
            name: {},
            test: { type: 'checkbox' },
            moshe: {},
            customer: selectFrom(customerApi, 'companyName'),
          },

          onOk: () => {},
        })
      }}
    >
      test
    </Button>
  )
}
