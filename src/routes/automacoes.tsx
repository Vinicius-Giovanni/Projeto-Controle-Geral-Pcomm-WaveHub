import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, Search, SlidersHorizontal } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AutomationCard } from "@/components/automation-card";
import { ExecutionDrawer } from "@/components/execution-drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { automations, type Automation } from "@/lib/mock-data";

export const Route = createFileRoute("/automacoes")({
  head: () => ({
    meta: [
      { title: "Automações · PCOM Studio" },
      {
        name: "description",
        content: "Catálogo de automações do PCOM com execução, configuração e logs por rotina.",
      },
      { property: "og:title", content: "Automações · PCOM Studio" },
      {
        property: "og:description",
        content: "Execute, configure e acompanhe cada automação do PCOM em cards interativos.",
      },
    ],
  }),
  component: AutomacoesPage,
});

function AutomacoesPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("todas");
  const [running, setRunning] = useState<Automation | null>(null);

  const list = useMemo(
    () =>
      automations.filter((a) => {
        const matchQuery = (a.name + a.description).toLowerCase().includes(query.toLowerCase());
        const matchTab = tab === "todas" || a.status === tab;
        return matchQuery && matchTab;
      }),
    [query, tab],
  );

  return (
    <>
      <AppHeader title="Automações" />

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="relative min-w-0 sm:w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar automações…"
              className="h-10 rounded-xl border-border bg-surface pl-9"
            />
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="h-10 rounded-xl bg-surface p-1">
                <TabsTrigger value="todas" className="rounded-lg text-xs">Todas</TabsTrigger>
                <TabsTrigger value="pronto" className="rounded-lg text-xs">Prontas</TabsTrigger>
                <TabsTrigger value="executando" className="rounded-lg text-xs">Em execução</TabsTrigger>
                <TabsTrigger value="erro" className="rounded-lg text-xs">Com erro</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="panel mt-8 flex flex-col items-center justify-center gap-3 py-24 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-2 text-muted-foreground">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Nenhuma automação encontrada</p>
            <p className="max-w-xs text-xs text-muted-foreground">
              Ajuste os filtros ou revise o termo pesquisado para ver as rotinas disponíveis.
            </p>
            <Button
              variant="ghost"
              className="mt-1 rounded-xl"
              onClick={() => {
                setQuery("");
                setTab("todas");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {list.map((a, i) => (
              <div key={a.id} className="rise-in" style={{ animationDelay: `${i * 50}ms` }}>
                <AutomationCard automation={a} onRun={setRunning} />
              </div>
            ))}
          </div>
        )}
      </div>

      <ExecutionDrawer
        automation={running}
        open={!!running}
        onOpenChange={(v) => !v && setRunning(null)}
      />
    </>
  );
}