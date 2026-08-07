import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type State = "conectado" | "aguardando" | "desconectado";

const config: Record<State, { label: string; color: string }> = {
  conectado: { label: "Conectado", color: "text-success" },
  aguardando: { label: "Aguardando", color: "text-warning" },
  desconectado: { label: "Desconectado", color: "text-destructive" },
};

export function PcomStatus() {
  const [state, setState] = useState<State>("conectado");
  const current = config[state];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex h-10 items-center gap-2.5 rounded-xl border border-border bg-surface px-3 text-sm transition-colors duration-200 hover:border-primary/40 hover:bg-surface-2">
          <span className={cn("relative flex", current.color)}>
            <span className={cn("dot-pulse h-2 w-2 rounded-full bg-current")} />
          </span>
          <span className="hidden font-medium sm:inline">PCOM</span>
          <span className={cn("hidden text-xs md:inline", current.color)}>{current.label}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Estado da conexão
        </DropdownMenuLabel>
        {(Object.keys(config) as State[]).map((key) => (
          <DropdownMenuItem key={key} onSelect={() => setState(key)} className="gap-2 rounded-lg">
            <span className={cn("h-2 w-2 rounded-full bg-current", config[key].color)} />
            {config[key].label}
            {state === key && <Check className="ml-auto h-3.5 w-3.5 text-muted-foreground" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-lg text-xs text-muted-foreground" disabled>
          Sessão A · host TN3270 · 00h 42m
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
