import { Button } from './ui/button'
import { selectFrom } from '../lib/env-web/select-from'
import { Customer, customerApi } from '../model/customer'
import { useFormDialog } from './useFormDialog'

export default function TestShowYoni() {
  const form = useFormDialog()
  return (
    <>
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
            // in my dream  val will know the members based on the fields above

            onOk: (val) => {},
          })
        }}
      >
        test
      </Button>
      <Button
        onClick={() => {
          form({
            title: 'hello',
            //this also has problems
            fields: customerApi.toFields('id', 'companyName'),

            onOk: (val: Customer) => {},
          })
        }}
      >
        test 2
      </Button>
    </>
  )
}
