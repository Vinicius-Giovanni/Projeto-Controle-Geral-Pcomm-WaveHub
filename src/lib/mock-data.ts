import {
  BarChart3,
  FileSpreadsheet,
  Package,
  Receipt,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type AutomationStatus =
  | "pronto"
  | "executando"
  | "erro"
  | "manutencao";

export type Automation = {
    id: string;
    name: string;
    description: string;
    icon: LucideIcon;
    status: AutomationStatus;
    lastRun: string;
    avgDuration: string;
};

export const automations: Automation[] = [
  {
    id: "bi-acertos",
    name: "Atualização BI de Acertos",
    description: "Atualiza automaticamente o BI de Acertos a partir da rotina PCOM.",
    icon: BarChart3,
    status: "pronto",
    lastRun: "Hoje, 08:42",
    avgDuration: "2m 10s",
  },
  {
    id: "bi-notas",
    name: "Atualização BI Notas Fiscais",
    description: "Baixa e trata as notas fiscais emitidas no período.",
    icon: Receipt,
    status: "pronto",
    lastRun: "Hoje, 07:15",
    avgDuration: "4m 05s",
  },
  {
    id: "expedicao",
    name: "Romaneio de Expedição",
    description: "Consolida cargas e gera o romaneio diário de expedição.",
    icon: Truck,
    status: "executando",
    lastRun: "Em execução",
    avgDuration: "6m 30s",
  },
  {
    id: "estoque",
    name: "Conferência de Estoque",
    description: "Compara saldo do PCOM com a base analítica interna.",
    icon: Warehouse,
    status: "pronto",
    lastRun: "Ontem, 19:02",
    avgDuration: "3m 44s",
  },
  {
    id: "pedidos",
    name: "Extração de Pedidos",
    description: "Extrai pedidos pendentes e exporta em planilha tratada.",
    icon: Package,
    status: "erro",
    lastRun: "Hoje, 06:58",
    avgDuration: "1m 52s",
  },
  {
    id: "fechamento",
    name: "Fechamento Mensal",
    description: "Rotina de fechamento com validação de divergências.",
    icon: FileSpreadsheet,
    status: "manutencao",
    lastRun: "01/07, 23:40",
    avgDuration: "12m 08s",
  },
];

export type HistoryEntry = {
  id: string;
  date: string;
  automation: string;
  duration: string;
  status: "sucesso" | "erro" | "cancelado";
  user: string;
};

export const history: HistoryEntry[] = [
  {
    id: "EX-10482",
    date: "29/07 09:12",
    automation: "Atualização BI de Acertos",
    duration: "2m 06s",
    status: "sucesso",
    user: "marina.duarte",
  },
  {
    id: "EX-10481",
    date: "29/07 08:40",
    automation: "Romaneio de Expedição",
    duration: "6m 21s",
    status: "sucesso",
    user: "carlos.lima",
  },
  {
    id: "EX-10480",
    date: "29/07 06:58",
    automation: "Extração de Pedidos",
    duration: "0m 34s",
    status: "erro",
    user: "marina.duarte",
  },
  {
    id: "EX-10479",
    date: "28/07 22:10",
    automation: "Conferência de Estoque",
    duration: "3m 51s",
    status: "sucesso",
    user: "sistema",
  },
  {
    id: "EX-10478",
    date: "28/07 19:02",
    automation: "Atualização BI Notas Fiscais",
    duration: "4m 12s",
    status: "cancelado",
    user: "juliana.reis",
  },
  {
    id: "EX-10477",
    date: "28/07 15:33",
    automation: "Atualização BI de Acertos",
    duration: "2m 18s",
    status: "sucesso",
    user: "carlos.lima",
  },
];

export type LogLevel = "info" | "sucesso" | "aviso" | "erro";

export type LogEntry = {
  time: string;
  automation: string;
  level: LogLevel;
  message: string;
};

export const logs: LogEntry[] = [
  { time: "09:12:04", automation: "BI de Acertos", level: "info", message: "Sessão PCOM 'A' inicializada." },
  { time: "09:12:07", automation: "BI de Acertos", level: "info", message: "Abrindo rotina LOG0421." },
  { time: "09:12:31", automation: "BI de Acertos", level: "sucesso", message: "Arquivo acertos_2907.csv baixado (2.4 MB)." },
  { time: "09:13:10", automation: "BI de Acertos", level: "sucesso", message: "Execução finalizada em 2m 06s." },
  { time: "08:41:55", automation: "Romaneio de Expedição", level: "aviso", message: "Tela demorou 4s a responder — retry 1/3." },
  { time: "08:40:02", automation: "Romaneio de Expedição", level: "info", message: "Consolidando 148 cargas." },
  { time: "06:58:22", automation: "Extração de Pedidos", level: "erro", message: "Timeout ao aguardar campo PEDIDO na tela 03." },
  { time: "06:58:04", automation: "Extração de Pedidos", level: "info", message: "Conectando ao PCOM (sessão B)." },
  { time: "06:57:40", automation: "Conferência de Estoque", level: "sucesso", message: "1.204 SKUs validados sem divergência." },
  { time: "06:55:11", automation: "Sistema", level: "info", message: "Verificação de atualizações concluída — versão 2.8.1." },
];

export const consoleSteps = [
  "Inicializando...",
  "Conectando ao PCOM...",
  "Validando sessão...",
  "Abrindo rotina...",
  "Baixando arquivos...",
  "Tratando dados...",
  "Finalizado.",
];
