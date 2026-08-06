import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Eye, Search } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { StatusBadge, type Tone } from "@/components/status-badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { history, type HistoryEntry } from "@/lib/mock-data";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico · PCOM Studio" },
      {
        name: "description",
        content: "Histórico completo de execuções das automações do PCOM com duração e status.",
      },
      { property: "og:title", content: "Histórico · PCOM Studio" },
      {
        property: "og:description",
        content: "Consulte execuções anteriores, duração, usuário e resultado de cada rotina.",
      },
    ],
  }),
  component: HistoricoPage,
});

const tone: Record<HistoryEntry["status"], Tone> = {
  sucesso: "success",
  erro: "danger",
  cancelado: "warning",
};

function HistoricoPage() {
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState<HistoryEntry | null>(null);

  const rows = history.filter((h) =>
    (h.automation + h.user + h.id).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <AppHeader title="Histórico de execuções" section="Histórico" />

      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10 lg:py-10">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="relative min-w-0 sm:w-[340px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por automação, usuário ou ID…"
              className="h-10 rounded-xl border-border bg-surface pl-9"
            />
          </div>
          <Button variant="ghost" className="h-10 shrink-0 rounded-xl text-xs">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        <div className="panel rise-in mt-7 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="px-6 text-[11px] uppercase tracking-wider">Data</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Automação</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Duração</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider">Usuário</TableHead>
                <TableHead className="px-6 text-right text-[11px] uppercase tracking-wider">
                  Detalhes
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-border transition-colors duration-200 hover:bg-surface-2/50"
                >
                  <TableCell className="px-6 font-mono text-xs text-muted-foreground">
                    {row.date}
                  </TableCell>
                  <TableCell className="text-[13px] font-medium">{row.automation}</TableCell>
                  <TableCell className="font-mono text-xs">{row.duration}</TableCell>
                  <TableCell>
                    <StatusBadge tone={tone[row.status]} className="capitalize">
                      {row.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{row.user}</TableCell>
                  <TableCell className="px-6 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={() => setDetail(row)}
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!detail} onOpenChange={(v) => !v && setDetail(null)}>
        <DialogContent className="rounded-2xl border-border bg-popover sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle className="text-base">{detail?.automation}</DialogTitle>
            <DialogDescription className="font-mono text-xs">
              Execução {detail?.id} · {detail?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["Duração", detail?.duration],
              ["Usuário", detail?.user],
              ["Sessão PCOM", "A"],
              ["Arquivos gerados", "3"],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-xl border border-border bg-surface-2/50 p-3">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="mt-1 text-[13px]">{value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-[oklch(0.14_0.006_264)] p-4 font-mono text-[12px] leading-relaxed">
            <p className="text-muted-foreground">09:12:04 · sessão inicializada</p>
            <p className="text-muted-foreground">09:12:31 · arquivo baixado</p>
            <p className={detail?.status === "erro" ? "text-destructive" : "text-success"}>
              09:13:10 · {detail?.status === "erro" ? "falha na rotina" : "execução concluída"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}