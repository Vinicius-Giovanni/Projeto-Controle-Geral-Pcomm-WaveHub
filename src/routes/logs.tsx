import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { logs, type LogLevel } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/logs")({
  head: () => ({
    meta: [
      { title: "Logs · PCOM Studio" },
      {
        name: "description",
        content: "Terminal de logs em tempo real das automações do PCOM com filtros por nível.",
      },
      { property: "og:title", content: "Logs · PCOM Studio" },
      {
        property: "og:description",
        content: "Pesquise e filtre logs de erro, sucesso, aviso e informação das automações.",
      },
    ],
  }),
  component: LogsPage,
});

const levelStyle: Record<LogLevel, string> = {
  info: "text-primary",
  sucesso: "text-success",
  aviso: "text-warning",
  erro: "text-destructive",
};

function LogsPage() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("todos");
  const [autoscroll, setAutoscroll] = useState(true);

  const rows = logs.filter(
    (l) =>
      (level === "todos" || l.level === level) &&
      (l.message + l.automation).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <AppHeader title="Logs" />

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="relative min-w-0 sm:w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pesquisar nos logs…"
              className="h-10 rounded-xl border-border bg-surface pl-9 font-mono text-xs"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <Tabs value={level} onValueChange={setLevel}>
              <TabsList className="h-10 rounded-xl bg-surface p-1">
                <TabsTrigger value="todos" className="rounded-lg text-xs">Todos</TabsTrigger>
                <TabsTrigger value="erro" className="rounded-lg text-xs">Erro</TabsTrigger>
                <TabsTrigger value="sucesso" className="rounded-lg text-xs">Sucesso</TabsTrigger>
                <TabsTrigger value="aviso" className="rounded-lg text-xs">Aviso</TabsTrigger>
                <TabsTrigger value="info" className="rounded-lg text-xs">Info</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="hidden items-center gap-2 lg:flex">
              <Switch id="autoscroll" checked={autoscroll} onCheckedChange={setAutoscroll} />
              <Label htmlFor="autoscroll" className="text-xs text-muted-foreground">
                Autoscroll
              </Label>
            </div>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="panel rise-in mt-7 overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
            <span className="ml-3 font-mono text-[11px] text-muted-foreground">
              pcom-studio · logs — {rows.length} registros
            </span>
          </div>

          <div className="max-h-[62vh] overflow-y-auto bg-[oklch(0.145_0.006_264)] px-5 py-4 font-mono text-[12.5px] leading-[1.9]">
            {rows.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                Nenhum log corresponde ao filtro atual.
              </p>
            ) : (
              rows.map((log, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_auto_1fr] gap-4 rounded-md px-2 transition-colors duration-150 hover:bg-surface-2/40"
                >
                  <span className="text-muted-foreground">{log.time}</span>
                  <span className={cn("w-[86px] shrink-0 uppercase", levelStyle[log.level])}>
                    [{log.level}]
                  </span>
                  <span className="min-w-0">
                    <span className="text-muted-foreground">{log.automation} · </span>
                    <span className="text-foreground/90">{log.message}</span>
                  </span>
                </div>
              ))
            )}
            <span className="text-primary">▋</span>
          </div>
        </div>
      </div>
    </>
  );
}