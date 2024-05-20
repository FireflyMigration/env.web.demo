import { Link, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import CustomerTable from './app/customer-table.tsx'
import OrdersTable from './app/orders-table.tsx'
import TeamSwitcher from './components/dashboard/components/team-switcher.tsx'
import { UserNav } from './components/dashboard/components/user-nav.tsx'
import DashboardPage from './components/dashboard/page.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { cn } from './lib/utils.ts'
import { useFormDialog } from './components/useFormDialog.tsx'

function App() {
  const form = useFormDialog()
  return (
    <div className="flex space-x-2 p-4">
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
                <Link
                  onClick={(e) => {
                    e.preventDefault()
                    form({
                      title: 'Orders Report',
                      fields: {
                        fromDate: {
                          type: 'date',
                        },
                        toDate: {
                          type: 'date',
                        },
                      },
                      defaultValues: {
                        fromDate: '2024-01-01',
                        toDate: '2024-12-31',
                      },
                      onOk: (value) => {
                        window.open(
                          '/home/ordersReport?' +
                            new URLSearchParams(value).toString(),
                          '_blank'
                        )
                      },
                    })
                  }}
                  to="/"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Print Orders
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
    </div>
  )
}

export default App
