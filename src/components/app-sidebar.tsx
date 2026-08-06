import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronsLeft,
  CircleHelp,
  Cpu,
  Gauge,
  History,
  LogOut,
  Settings,
  Terminal,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "@/components/user-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const items = [
  { title: "Dashboard", url: "/", icon: Gauge },
  { title: "Automações", url: "/automacoes", icon: Workflow },
  { title: "Histórico", url: "/historico", icon: History },
  { title: "Logs", url: "/logs", icon: Terminal },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
  { title: "Ajuda", url: "/ajuda", icon: CircleHelp },
];

export function AppSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-[260px]",
      )}
    >
      <div className="flex h-16 items-center gap-3 px-5">
        <div
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          <Cpu className="h-[18px] w-[18px]" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">PCOM Studio</p>
            <p className="truncate text-[11px] text-muted-foreground">Automation Control</p>
          </div>
        )}
      </div>

      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {items.map((item) => {
          const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
          const link = (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                collapsed && "justify-center px-0",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <span
                className={cn(
                  "absolute left-0 h-5 w-[3px] rounded-r-full bg-primary transition-opacity duration-200",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );

          return collapsed ? (
            <Tooltip key={item.title}>
              <TooltipTrigger asChild>{link}</TooltipTrigger>
              <TooltipContent side="right">{item.title}</TooltipContent>
            </Tooltip>
          ) : (
            link
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <button
          onClick={onToggle}
          className={cn(
            "mb-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <ChevronsLeft
            className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")}
          />
          {!collapsed && <span>Recolher</span>}
        </button>

        <UserMenu side={collapsed ? "right" : "top"} align={collapsed ? "end" : "start"}>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border border-sidebar-border bg-surface-2/60 p-2.5 text-left transition-colors hover:bg-sidebar-accent/60",
              collapsed && "justify-center border-transparent bg-transparent p-0",
            )}
          >
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              MD
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">Marina Duarte</p>
                <p className="truncate text-[11px] text-muted-foreground">Analista de Dados</p>
              </div>
            )}
            {!collapsed && <LogOut className="h-4 w-4 shrink-0 text-muted-foreground" />}
          </button>
        </UserMenu>

      </div>
    </aside>
  );
}