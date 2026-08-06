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

export function AppSideBar({
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
            <div className="flex h-16 items-center gap-3 px-5"></div>
        </aside>
    )
}