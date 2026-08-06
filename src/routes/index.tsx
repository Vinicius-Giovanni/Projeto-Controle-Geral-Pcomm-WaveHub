import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cpu,
  Play,
  Timer,
  TriangleAlert,
  Workflow,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ExecutionDrawer } from "@/components/execution-drawer";
import { automations, history, logs, type Automation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · PCOM Studio" },
      {
        name: "description",
        content:
          "Visão geral das automações do PCOM: status da sessão, execuções do dia e atividades recentes.",
      },
      { property: "og:title", content: "Dashboard · PCOM Studio" },
      {
        property: "og:description",
        content: "Status do PCOM, execuções do dia e atividades recentes em um só painel.",
      },
    ],
  }),
  component: Dashboard,
});

const levelTone = {
  info: "text-primary",
  sucesso: "text-success",
  aviso: "text-warning",
  erro: "text-destructive",
} as const;

function Dashboard() {
  const [running, setRunning] = useState<Automation | null>(null);

  return (
    <>
      <AppHeader title="Dashboard" />

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
        {/* PCOM hero + KPIs */}
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="panel rise-in relative overflow-hidden p-6">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">IBM Personal Communications</p>
                  <p className="text-[11px] text-muted-foreground">Sessão de emulação ativa</p>
                </div>
              </div>
              <StatusBadge tone="success">Conectado</StatusBadge>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-4">
              {[
                { label: "Sessão", value: "A" },
                { label: "Tempo online", value: "04h 12m" },
                { label: "Latência", value: "38 ms" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-surface-2/50 p-3">
                  <p className="text-[11px] text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-mono text-lg tracking-tight">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Estabilidade da sessão nas últimas 24h</span>
                <span className="font-mono text-success">99,2%</span>
              </div>
              <Progress value={99} className="mt-2 h-1.5 bg-surface-2" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
            {[
              { label: "Automações disponíveis", value: "12", icon: Workflow, hint: "+2 este mês" },
              { label: "Executadas hoje", value: "38", icon: Play, hint: "+14% vs ontem" },
              { label: "Última execução", value: "09:12", icon: Clock, hint: "BI de Acertos" },
              { label: "Tempo médio", value: "3m 24s", icon: Timer, hint: "−18s vs média" },
            ].map((kpi, i) => (
              <div
                key={kpi.label}
                className="panel lift rise-in p-5"
                style={{ animationDelay: `${60 * i}ms` }}
              >
                <div className="flex items-center justify-between">
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                </div>
                <p className="mt-6 text-[28px] font-semibold leading-none tracking-tight">
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{kpi.label}</p>
                <p className="mt-3 text-[11px] text-success">{kpi.hint}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Atividades + logs */}
        <section className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="panel rise-in p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Atividades recentes</h2>
              </div>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs">
                Ver histórico
              </Button>
            </div>

            <ul className="mt-5 divide-y divide-border">
              {history.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 py-3.5 transition-colors duration-200 hover:bg-surface-2/40"
                >
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
                      item.status === "sucesso" && "bg-success/12 text-success",
                      item.status === "erro" && "bg-destructive/12 text-destructive",
                      item.status === "cancelado" && "bg-warning/12 text-warning",
                    )}
                  >
                    {item.status === "sucesso" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <TriangleAlert className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{item.automation}</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {item.user} · {item.date}
                    </p>
                  </div>
                  <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                    {item.duration}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-success/20 bg-success/8 p-4">
                <p className="text-[11px] text-muted-foreground">Execuções concluídas</p>
                <p className="mt-1 text-2xl font-semibold text-success">34</p>
              </div>
              <div className="rounded-xl border border-destructive/20 bg-destructive/8 p-4">
                <p className="text-[11px] text-muted-foreground">Execuções com erro</p>
                <p className="mt-1 text-2xl font-semibold text-destructive">4</p>
              </div>
            </div>
          </div>

          <div className="panel rise-in flex flex-col p-6">
            <h2 className="text-sm font-semibold">Últimos logs</h2>
            <div className="mt-4 flex-1 space-y-2.5 font-mono text-[12px]">
              {logs.slice(0, 7).map((log, i) => (
                <p key={i} className="flex gap-3 leading-relaxed">
                  <span className="shrink-0 text-muted-foreground">{log.time}</span>
                  <span className={cn("truncate", levelTone[log.level])}>{log.message}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Atalho de execução */}
        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Execução rápida</h2>
            <p className="text-xs text-muted-foreground">3 automações favoritas</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {automations.slice(0, 3).map((a) => (
              <button
                key={a.id}
                onClick={() => setRunning(a)}
                className="panel lift flex items-center gap-4 p-4 text-left"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-primary">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{a.name}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">
                    {a.avgDuration} · {a.lastRun}
                  </span>
                </span>
                <Play className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      </div>

      <ExecutionDrawer
        automation={running}
        open={!!running}
        onOpenChange={(v) => !v && setRunning(null)}
      />
    </>
  );
}
