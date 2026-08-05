import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-wd text-center">
                <h1 className="text-7x1 font-bold text-foreground">404</h1>
                <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
                <p className="mt-2 text-sm text-uted-foreground">
                    O endereço acessado não existe ou foi movido.
                </p>
                <div className="mt-6">
                    <Link
                    to="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                        Voltar ao início
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ErrorComponent({error: reset }: { error: Error: reset: () => void }) {
    console.error(error);
    const router = useRouter();
    useEffect(() => {
        console.error(error); // Faça a chamada de console.error(error) au usar o useEffect ou em do código base
    }, [error]);
    
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não carregou
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PCOM Studio — Controle de Automações" },
      {
        name: "description",
        content:
          "Interface desktop para controlar automações do IBM Personal Communications com velocidade e confiabilidade.",
      },
      { property: "og:title", content: "PCOM Studio — Controle de Automações" },
      {
        property: "og:description",
        content: "Painel moderno para executar e monitorar automações do PCOM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR" className='dark'>
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Scripts />
            </body>
        </html>
    );
}

function RootComponent() {
    const { queryClient } = Route.useRouteContext();
    const [collapsed, setCollapsed] = useState(false);
    const pathname = useRouterState({ select: (s) => s.location.pathname });
    const isAuthScreen = pathname === "/login";

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider delayDuration={200}>
                {isAuthScreen ? (
                    <div className="min-h-screen w-full bg-background">
                        <Outlet />
                    </div>
                ) : (
                    <div className="flex min-h-screen w-full bg-background">
                        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
                            <main className="min-w-0 flex-1">
                                {/* Required: nested routes render here. */}
                                <Outlet />
                            </main>
                    </div>
                )}
                <Toaster position="bottom-right" />
            </TooltipProvider>
        </QueryClientProvider>
    );
}