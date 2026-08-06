import { Play, Settings2, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge, type Tone } from "@/components/status-badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Automation } from "@/lib/mock-data";

const statusMap: Record<Automation["status"], { label: string; tone: Tone }> = {
  pronto: { label: "Pronto", tone: "success" },
  executando: { label: "Executando", tone: "info" },
  erro: { label: "Erro", tone: "danger" },
  manutencao: { label: "Manutenção", tone: "warning" },
};

export function AutomationCard({
  automation,
  onRun,
}: {
  automation: Automation;
  onRun: (a: Automation) => void;
}) {
  const status = statusMap[automation.status];

  return (
    <article className="panel lift group flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-primary transition-colors duration-200 group-hover:bg-primary/12">
          <automation.icon className="h-5 w-5" />
        </div>
        <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
      </div>

      <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{automation.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
        {automation.description}
      </p>

      <dl className="mt-4 flex gap-6 text-[11px] text-muted-foreground">
        <div>
          <dt>Última execução</dt>
          <dd className="mt-0.5 text-foreground">{automation.lastRun}</dd>
        </div>
        <div>
          <dt>Duração média</dt>
          <dd className="mt-0.5 font-mono text-foreground">{automation.avgDuration}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <Button
          className="h-9 flex-1 rounded-lg"
          disabled={automation.status === "manutencao"}
          onClick={() => onRun(automation)}
        >
          <Play className="mr-2 h-3.5 w-3.5" />
          Executar
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <Settings2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Configurar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
              <ScrollText className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver logs</TooltipContent>
        </Tooltip>
      </div>
    </article>
  );
}