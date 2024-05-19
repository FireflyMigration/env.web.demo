import FormGroup, { FieldConfig } from './form-group/form-group';
import { useState } from 'react';
import { useDialog } from './dialog/dialog-context';
import { Button } from './ui/button';
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog';


export function useFormDialog() {
  const dialog = useDialog();
  return function <T>(args: {
    title?: string;
    fields: Record<keyof T, Partial<FieldConfig>>;
    defaultValues?: T;
    onOk: (value: T) => void | Promise<void>;
  }) {
    dialog((resolve) => {
      const [state, setState] = useState<T>(args.defaultValues ?? ({} as T));

      async function ok() {
        try {
          await args.onOk(state);
          resolve();
        } catch { }
      }

      return (
        <div>
          <DialogHeader>
            <DialogTitle>{args.title}</DialogTitle>
          </DialogHeader>
          <FormGroup
            fields={args.fields}
            state={state as any}
            setState={setState as any} />
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button variant="default" onClick={ok}>
              Ok
            </Button>
          </DialogFooter>
        </div>
      );
    });
  };
}
