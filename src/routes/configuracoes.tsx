import { createFileRoute } from "@tanstack/react-router";
import { FolderOpen, Moon, RefreshCw } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações · PCOM Studio" },
      {
        name: "description",
        content: "Ajuste tema, sessão PCOM, diretórios, tempo limite e atualizações do aplicativo.",
      },
      { property: "og:title", content: "Configurações · PCOM Studio" },
      {
        property: "og:description",
        content: "Preferências de tema, sessão, downloads e atualizações do PCOM Studio.",
      },
    ],
  }),
  component: ConfiguracoesPage,
});

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-b border-border py-5 last:border-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function ConfiguracoesPage() {
  return (
    <>
      <AppHeader title="Configurações" />

      <div className="mx-auto max-w-[1000px] px-6 py-8 lg:px-10 lg:py-10">
        <section className="panel rise-in px-6 py-2">
          <Row title="Tema" description="Dark mode é o padrão do PCOM Studio.">
            <Select defaultValue="escuro">
              <SelectTrigger className="h-10 w-[180px] rounded-xl bg-surface-2">
                <Moon className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="escuro">Escuro</SelectItem>
                <SelectItem value="claro">Claro</SelectItem>
                <SelectItem value="sistema">Sistema</SelectItem>
              </SelectContent>
            </Select>
          </Row>

          <Row title="Diretório padrão" description="Local onde os arquivos tratados são salvos.">
            <div className="flex items-center gap-2">
              <Input
                readOnly
                defaultValue="C:\\PCOM\\Automacoes\\Saida"
                className="h-10 w-[260px] rounded-xl bg-surface-2 font-mono text-xs"
              />
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl">
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
          </Row>

          <Row title="Sessão PCOM" description="Sessão de emulação utilizada nas execuções.">
            <Select defaultValue="A">
              <SelectTrigger className="h-10 w-[180px] rounded-xl bg-surface-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {["A", "B", "C", "D"].map((s) => (
                  <SelectItem key={s} value={s}>
                    Sessão {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Row>

          <Row title="Tempo limite" description="Tempo máximo de espera por tela do emulador.">
            <div className="flex items-center gap-2">
              <Input
                defaultValue="30"
                className="h-10 w-[90px] rounded-xl bg-surface-2 text-center font-mono"
              />
              <span className="text-xs text-muted-foreground">segundos</span>
            </div>
          </Row>

          <Row title="Downloads automáticos" description="Baixar arquivos gerados ao final da rotina.">
            <Switch defaultChecked />
          </Row>

          <Row title="Atualizações" description="Versão 2.8.1 · verificada há 12 minutos.">
            <div className="flex items-center gap-3">
              <StatusBadge tone="success">Atualizado</StatusBadge>
              <Button
                variant="ghost"
                className="h-10 rounded-xl text-xs"
                onClick={() => toast.success("Nenhuma atualização disponível")}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Verificar
              </Button>
            </div>
          </Row>
        </section>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" className="rounded-xl">
            Descartar
          </Button>
          <Button className="rounded-xl" onClick={() => toast.success("Preferências salvas")}>
            Salvar alterações
          </Button>
        </div>
      </div>
    </>
  );
}