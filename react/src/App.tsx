import { Toaster } from 'sonner'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import DialogProvider from './components/dialog/dialog-context.tsx'
import Test from './components/test.tsx'
import DashboardPage from './components/dashboard/page.tsx'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import TeamSwitcher from './components/dashboard/components/team-switcher.tsx'
import { MainNav } from './components/dashboard/components/main-nav.tsx'
import { UserNav } from './components/dashboard/components/user-nav.tsx'
import { cn } from './lib/utils.ts'
import CustomerTable from './app/customer-table.tsx'
import OrdersTable from './app/orders-table.tsx'

function App() {
  return (
    <div className="flex space-x-2 p-4">
      <DialogProvider>
        <TooltipProvider>
          <div className=" flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <TeamSwitcher />
                <nav
                  className={cn(
                    'flex items-center space-x-4 lg:space-x-6',
                    'mx-6'
                  )}
                >
                  <Link
                    to="/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Overview
                  </Link>
                  <Link
                    to="/customers"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Customers
                  </Link>
                  <Link
                    to="/orders"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    Orders
                  </Link>
                </nav>
                <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
                </div>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/customers" element={<CustomerTable />} />
              <Route path="/orders" element={<OrdersTable />} />
            </Routes>
          </div>
        </TooltipProvider>
        <Toaster />
      </DialogProvider>
    </div>
  )
}

export default App
