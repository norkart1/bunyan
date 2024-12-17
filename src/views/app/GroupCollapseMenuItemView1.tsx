import { Alert, Dropdown } from "@/components/ui"
import { useState } from "react"

/** Example purpose only */
const GroupCollapseMenuItemView1 = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen)
    }
  
    return <>
     <div className="flex flex-1 flex-col overflow-hidden">
        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          
          {/* Summary Cards */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">12,345</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">$34,567</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Active Projects</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">23</p>
            </div>
            <Dropdown title="Dropdown Example" className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-700">Dropdown Example</h2>
              <p className="mt-2 text-3xl font-bold text-gray-800">23</p>
            </Dropdown>
            <Alert>
                Additional description and information about copywriting.
            </Alert>
          </div>

          {/* Chart */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Monthly Revenue</h2>
            <div className="mt-4 h-64 w-full">
              <div className="flex h-full items-end">
                {[60, 45, 80, 50, 70, 30].map((value, index) => (
                  <div
                    key={index}
                    className="mx-2 w-1/6 bg-blue-500"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </main>
      </div>
    </>
}

export default GroupCollapseMenuItemView1
