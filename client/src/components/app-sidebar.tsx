import { Home, CheckSquare, DollarSign, AlertTriangle, Database, BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    testId: "nav-dashboard",
  },
  {
    title: "Compliance & Completeness",
    url: "/dashboard/compliance",
    icon: CheckSquare,
    testId: "nav-compliance",
  },
  {
    title: "Financial Analysis",
    url: "/dashboard/financial",
    icon: DollarSign,
    testId: "nav-financial",
  },
  {
    title: "Risk Assessment",
    url: "/dashboard/risk",
    icon: AlertTriangle,
    testId: "nav-risk",
  },
  {
    title: "Data Explorer",
    url: "/dashboard/data",
    icon: Database,
    testId: "nav-data",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="bg-blue-950 border-r border-blue-900">
      <SidebarHeader className="border-b border-blue-900 p-4 bg-blue-950">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">DPRSense</h2>
            <p className="text-xs text-blue-300">MDoNER</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-blue-950">
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Analysis Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={item.testId}
                    className="text-blue-100 hover:bg-blue-900 hover:text-white data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <Link href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-blue-900 p-4 bg-blue-950">
        <div className="text-xs text-blue-300">
          <p>Logged in as: <span className="font-medium text-white">admin</span></p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
