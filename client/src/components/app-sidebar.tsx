import { Home, CheckSquare, DollarSign, AlertTriangle, Database } from "lucide-react";
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
import { Shield } from "lucide-react";

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
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-sidebar-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-sidebar-foreground">DPR Appraisal</h2>
            <p className="text-xs text-muted-foreground">MDoNER</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analysis Views</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={item.testId}
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

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="text-xs text-muted-foreground">
          <p>Logged in as: <span className="font-medium text-sidebar-foreground">admin</span></p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
