import { Route, Switch, useLocation } from "wouter";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import OverviewPage from "./overview";
import CompliancePage from "./compliance";
import FinancialPage from "./financial";
import RiskPage from "./risk";
import DataExplorerPage from "./data-explorer";
import { ActionPanel } from "@/components/action-panel";
import { Separator } from "@/components/ui/separator";

export default function DashboardLayout() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            <div className="max-w-7xl mx-auto space-y-6">
              <Switch>
                <Route path="/dashboard" component={OverviewPage} />
                <Route path="/dashboard/compliance" component={CompliancePage} />
                <Route path="/dashboard/financial" component={FinancialPage} />
                <Route path="/dashboard/risk" component={RiskPage} />
                <Route path="/dashboard/data" component={DataExplorerPage} />
              </Switch>

              <Separator className="my-8" />

              {/* Action Panel - Always visible at bottom */}
              <ActionPanel />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
