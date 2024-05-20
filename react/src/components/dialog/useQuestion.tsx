import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '../ui/button.tsx'
import { useDialog } from './dialog-context.tsx'

export default function useQuestion() {
  const dialog = useDialog()
  return ({ title, description }: { title: string; description?: string }) =>
    dialog(
      (resolve) => (
        <div>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">no</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={() => resolve(true)}>
                Yes
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      ),
      false
    )
}

export function useError() {
  const dialog = useDialog()
  return ({
    title,
    message: description,
  }: {
    title?: string
    message: string
  }) =>
    dialog(
      () => (
        <div>
          <DialogHeader>
            <DialogTitle>{title ?? 'Error'}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="destructive">Ok</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      ),
      false
    )
}
