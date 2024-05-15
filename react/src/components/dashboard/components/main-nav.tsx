import { cn } from '@/lib/utils'
import { aButtonWasClicked } from '../../../winforms-bridge/dotnet'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <a
        href="/examples/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </a>
      <a
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => {
          aButtonWasClicked('Customers')
        }}
      >
        Customers
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Products
      </a>
      <a
        href="/examples/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </a>
    </nav>
  )
}
