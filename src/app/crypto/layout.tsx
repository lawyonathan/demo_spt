"use client"

import { useState } from "react"
import { CryptoSidebar } from "@/components/ui/crypto-sidebar"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CryptoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50/50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 lg:static lg:z-auto",
          "transform transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <CryptoSidebar className="h-full" />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex h-14 items-center border-b px-4 lg:hidden bg-white">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <span className="ml-3 font-semibold text-sm">Cryptio</span>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
