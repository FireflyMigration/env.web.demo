import { Toaster } from 'sonner'
import TasksTable from './components/task-table/tasks-table.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import DialogProvider from './components/dialog/dialog-context.tsx'
import DashboardPage from './components/dashboard/page.tsx'

function App() {
  return (
    <div className="flex space-x-2 p-4">
      <DialogProvider>
        <TooltipProvider>
          <DashboardPage />
          {/* <TasksTable /> */}
        </TooltipProvider>
        <Toaster />
      </DialogProvider>
    </div>
  )
}

export default App
