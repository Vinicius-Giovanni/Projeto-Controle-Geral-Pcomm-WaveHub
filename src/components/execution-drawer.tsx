import { useEffect, useRef, useState } from "react";
import { Loader2, Square, CheckCircle2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { consoleSteps, type Automation } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ExecutionDrawer({
  automation,
  open,
  onOpenChange,
}: {
  automation: Automation | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s >= consoleSteps.length - 1 ? s : s + 1));
    }, 1400);
    return () => clearInterval(id);
  }, [open, automation?.id]);

  useEffect(() => {
    consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight, behavior: "smooth" });
  }, [step]);

  const done = step >= consoleSteps.length - 1;
  const progress = Math.round(((step + 1) / consoleSteps.length) * 100);

  if (!automation) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-[520px]"
      >
        <SheetHeader className="gap-3 border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <automation.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <SheetTitle className="truncate text-base">{automation.name}</SheetTitle>
              <SheetDescription className="truncate text-xs">
                {automation.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              {done ? (
                <CheckCircle2 className="h-4 w-4 text-success" />
              ) : (
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
              )}
              {consoleSteps[step]}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="mt-3 h-1.5 bg-surface-2" />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            <span>Etapa {step + 1} de {consoleSteps.length}</span>
            <span>Tempo estimado · {automation.avgDuration}</span>
          </div>

          <ol className="mt-6 space-y-3">
            {consoleSteps.map((label, i) => (
              <li key={label} className="flex items-center gap-3 text-xs">
                <span
                  className={cn(
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] transition-colors duration-300",
                    i < step && "border-success/40 bg-success/15 text-success",
                    i === step && "border-primary bg-primary/15 text-primary",
                    i > step && "border-border text-muted-foreground",
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn(i > step ? "text-muted-foreground" : "text-foreground")}>
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <p className="mt-7 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Console
          </p>
          <div
            ref={consoleRef}
            className="mt-2 h-[210px] overflow-y-auto rounded-xl border border-border bg-[oklch(0.14_0.006_264)] p-4 font-mono text-[12px] leading-relaxed"
          >
            {consoleSteps.slice(0, step + 1).map((line, i) => (
              <p key={line} className="rise-in flex gap-3">
                <span className="text-muted-foreground">
                  09:1{i}:0{i}
                </span>
                <span className={i === consoleSteps.length - 1 ? "text-success" : "text-foreground/85"}>
                  {line}
                </span>
              </p>
            ))}
            {!done && <span className="text-primary">▋</span>}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          <StatusBadge tone={done ? "success" : "info"}>
            {done ? "Concluído" : "Executando"}
          </StatusBadge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="rounded-xl"
              onClick={() => {
                onOpenChange(false);
                toast("Execução cancelada", { description: automation.name });
              }}
            >
              <Square className="mr-2 h-3.5 w-3.5" />
              Cancelar execução
            </Button>
            <Button className="rounded-xl" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}