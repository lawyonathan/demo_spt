"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Building2,
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Hotel,
  FolderKanban,
  Home,
  TrendingUp,
  Users,
  Columns3,
  StickyNote,
  MessageCircle,
  CalendarDays,
  FolderOpen,
  UserCog,
  Settings,
  Tag,
  ChevronDown,
  AppWindow,
  FileText,
} from "lucide-react"

interface NavItem {
  label: string
  icon: React.ElementType
  active?: boolean
  badge?: string | number
}

interface NavSection {
  title: string
  icon: React.ElementType
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    title: "Dashboards",
    icon: LayoutDashboard,
    items: [
      { label: "Classic", icon: LayoutDashboard },
      { label: "E-commerce", icon: ShoppingCart },
      { label: "Payment", icon: CreditCard },
      { label: "Hotel", icon: Hotel },
      { label: "Project Management", icon: FolderKanban },
      { label: "Real Estate", icon: Home, active: true },
      { label: "Sales", icon: TrendingUp },
      { label: "CRM", icon: Users },
    ],
  },
  {
    title: "Apps",
    icon: AppWindow,
    items: [
      { label: "Kanban", icon: Columns3 },
      { label: "Notes", icon: StickyNote },
      { label: "Chats", icon: MessageCircle, badge: 5 },
      { label: "Calendar", icon: CalendarDays },
      { label: "File Manager", icon: FolderOpen },
    ],
  },
  {
    title: "Pages",
    icon: FileText,
    items: [
      { label: "Users", icon: UserCog },
      { label: "Settings", icon: Settings },
      { label: "Pricing", icon: Tag },
    ],
  },
]

export interface DashboardSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

const DashboardSidebar = React.forwardRef<HTMLDivElement, DashboardSidebarProps>(
  ({ className, collapsed = false, ...props }, ref) => {
    const [openSections, setOpenSections] = React.useState<
      Record<string, boolean>
    >({
      Dashboards: true,
      Apps: true,
      Pages: true,
    })

    const toggleSection = (title: string) => {
      setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
          collapsed ? "w-16" : "w-64",
          "transition-all duration-200",
          className
        )}
        {...props}
      >
        {/* Logo */}
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <Building2 className="h-6 w-6 shrink-0 text-sidebar-primary" />
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight">PropDash</span>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {navSections.map((section) => (
            <div key={section.title} className="mb-4">
              {/* Section header */}
              <button
                onClick={() => toggleSection(section.title)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors",
                  collapsed && "justify-center"
                )}
              >
                <section.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        !openSections[section.title] && "-rotate-90"
                      )}
                    />
                  </>
                )}
              </button>

              {/* Section items */}
              {openSections[section.title] && (
                <div className="mt-1 space-y-0.5">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        item.active
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left truncate">
                            {item.label}
                          </span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                                item.active
                                  ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                                  : "bg-sidebar-accent text-sidebar-accent-foreground"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User profile */}
        <div className="border-t border-sidebar-border p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md px-2 py-2",
              collapsed && "justify-center"
            )}
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-sm font-semibold">
              JD
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none truncate">
                    John Doe
                  </p>
                  <p className="mt-0.5 text-xs text-sidebar-foreground/50 truncate">
                    john@example.com
                  </p>
                </div>
                <button
                  className="shrink-0 rounded-md p-1.5 text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
)

DashboardSidebar.displayName = "DashboardSidebar"

export { DashboardSidebar }
