import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/dashboard"

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-montserrat">
        <Sidebar />

        <main className="container flex-1 m-5 mt-7 text-slate-800 ml-35 lg:ml-67.5">
            <Outlet />
        </main>
    </div>
  )
}
