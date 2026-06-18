import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
// import ThemeToggle from '../ThemeToggle'

const AdminLayout = () => {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Explicit array structures governing admin sidebar link distributions cleanly
  const adminLinks = [
    { path: "/admin", label: "Özet Panel", icon: "📊" },
    { path: "/admin/properties", label: "İlan Yönetimi", icon: "🏢" },
    { path: "/admin/customers", label: "Müşteriler", icon: "👥" },
    { path: "/admin/users", label: "Acenteler / Üyeler", icon: "👤" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark font-display flex transition-colors duration-300">
      
      {/* Sidebar Navigation Drawer */}
      <aside className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col pt-24 z-40`}>
        <div className="flex flex-col gap-2 px-4">
          {adminLinks.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 ${
                  isActive 
                    ? "bg-brand-gold/10 text-brand-gold border-l-2 border-brand-gold font-medium" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900"
                }`}
              >
                <span>{link.icon}</span>
                <span className={`${isSidebarOpen ? "block" : "hidden"} transition-opacity`}>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Primary Dashboard Content Framework */}
      <div className="flex-1 flex flex-col pt-24 px-8 md:px-12 overflow-y-auto">
        
        {/* Sub Header Panel Toolbar */}
        <header className="w-full flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-600 dark:text-slate-400 hover:text-brand-gold cursor-pointer"
            >
              ☰
            </button>
            <h2 className="text-sm uppercase tracking-widest font-serif font-light text-slate-800 dark:text-white">
              Görkem Emlak <span className="text-brand-gold font-sans font-semibold">Yönetim Masası</span>
            </h2>
          </div>
          {/* <ThemeToggle /> */}
        </header>

        {/* Dynamic Nested Route Target Render Outlet Frame */}
        <main className="flex-1 pb-12">
          <Outlet />
        </main>
        
      </div>
    </div>
  )
}

export default AdminLayout