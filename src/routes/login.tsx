import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, IdCard, Lock, Eye, EyeOff, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — PCOM Studio" },
      {
        name: "description",
        content:
          "Acesse o PCOM Studio com código de empresa, matrícula e senha para controlar suas automações.",
      },
      { property: "og:title", content: "Entrar — PCOM Studio" },
      {
        property: "og:description",
        content: "Acesso seguro ao painel de automações do IBM Personal Communications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState("");
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = company.trim() && registration.trim() && password.trim();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[1.05fr_1fr]">
      {/* Painel lateral de marca */}
      <aside className="relative hidden overflow-hidden border-r border-border bg-surface lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ backgroundImage: "var(--gradient-surface)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl opacity-25"
          style={{ backgroundImage: "var(--gradient-primary)" }}
          aria-hidden
        />

        <div className="relative flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">PCOM Studio</p>
            <p className="text-xs text-muted-foreground">Controle de automações</p>
          </div>
        </div>

        <div className="relative max-w-md rise-in">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground">
            Automação de terminal,
            <span className="block text-primary">sem fricção.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Execute, acompanhe e audite rotinas do IBM Personal Communications a partir de um único
            painel — rápido, previsível e rastreável.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4">
            {[
              { k: "99,9%", v: "Disponibilidade" },
              { k: "4.2s", v: "Execução média" },
              { k: "128", v: "Rotinas ativas" },
            ].map((item) => (
              <div key={item.v} className="panel px-4 py-3">
                <dt className="font-mono text-lg font-semibold text-foreground">{item.k}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="relative text-xs text-muted-foreground">
          Sessão protegida · Uso corporativo restrito
        </p>
      </aside>

      {/* Formulário */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm rise-in">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              <Terminal className="h-4.5 w-4.5" />
            </div>
            <p className="text-sm font-semibold tracking-tight">PCOM Studio</p>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Entrar</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Informe suas credenciais corporativas para continuar.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="company">Código da empresa</Label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex.: 0417"
                  autoComplete="organization"
                  maxLength={20}
                  className="h-11 pl-9 font-mono tracking-wide"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registration">Matrícula</Label>
              <div className="relative">
                <IdCard className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="registration"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                  placeholder="Ex.: C123456"
                  autoComplete="username"
                  maxLength={32}
                  className="h-11 pl-9 font-mono tracking-wide"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  maxLength={128}
                  className="h-11 px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                <Checkbox id="remember" />
                <span>Manter conectado</span>
              </label>
              <a href="/ajuda" className="text-sm text-primary transition-opacity hover:opacity-80">
                Esqueci a senha
              </a>
            </div>

            <Button type="submit" disabled={!canSubmit} className="group h-11 w-full">
              Acessar painel
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </form>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
            Ao continuar você concorda com as políticas internas de uso do ambiente PCOM.
          </p>
        </div>
      </main>
    </div>
  );
}
