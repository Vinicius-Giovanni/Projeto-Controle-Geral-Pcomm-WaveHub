import { Search, Settings, PanelsTopLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PcomStatus } from "@/components/pcom-status";
import { UserMenu } from "@/components/user-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AppHeader({ title, section }: { title: string; section?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/80 backdrop-blur-xl">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 lg:px-10">
        <div className="min-w-0">
          <Breadcrumb>
            <BreadcrumbList className="text-[11px]">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">PCOM Studio</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{section ?? title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-1 truncate text-xl font-semibold tracking-tight lg:text-[22px]">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Pesquisar automações, logs…"
              className="h-10 w-[220px] rounded-xl border-border bg-surface pl-9 pr-14 text-sm transition-all duration-200 focus-visible:w-[300px] xl:w-[280px] xl:focus-visible:w-[360px]"
            />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <PcomStatus />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <Link to="/configuracoes">
                  <Settings className="h-[18px] w-[18px]" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configurações</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden h-10 w-10 rounded-xl xl:inline-flex">
                <PanelsTopLeft className="h-[18px] w-[18px]" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Modo compacto</TooltipContent>
          </Tooltip>

          <UserMenu side="bottom" align="end">
            <button className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary transition-colors hover:bg-primary/25">
              MD
            </button>
          </UserMenu>

        </div>
      </div>
    </header>
  );
}
