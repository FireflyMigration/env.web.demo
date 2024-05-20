import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu.tsx'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button.tsx'

export default function RowActions({
  actions,
}: {
  actions: { text: string; onClick: VoidFunction }[]
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex size-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          {actions.map((a) => (
            <DropdownMenuItem onSelect={a.onClick}>{a.text}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
