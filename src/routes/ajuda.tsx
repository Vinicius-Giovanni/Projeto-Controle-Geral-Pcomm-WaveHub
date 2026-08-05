import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, MessageSquare } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import {
    Accordion,
    accordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ajuda")({
    head: () => ({
        meta: [
            { title: "Ajuda · WaveHub PCOM"},
            {
                name: "description",
                content: "Guias rápidos e respostas sobre execução de automações no WaveHub PCOM.",
            },
            { property: "og:title", content: "Ajuda · WaveHub PCOM"},
            {
                property: "og:description",
                content: "Perguntas frequentes e suporte para usuários das automações do PCOM."
            },
        ],
    }),
    component: AjudaPage,
});

const faq = [
  {
    q: "Como executo uma automação?",
    a: "Abra a página Automações, localize o card desejado e clique em Executar. O painel lateral mostra progresso, etapa atual e console em tempo real.",
  },
  {
    q: "O que significa o indicador de status do PCOM?",
    a: "Verde indica sessão conectada, amarelo indica sessão aguardando resposta do emulador e vermelho indica que o PCOM está desconectado.",
  },
  {
    q: "Onde encontro os arquivos gerados?",
    a: "No diretório padrão definido em Configurações. Cada execução cria uma subpasta com data e nome da automação.",
  },
  {
    q: "Posso cancelar uma execução em andamento?",
    a: "Sim. No painel lateral de execução use o botão Cancelar execução; a rotina é encerrada com segurança e registrada no histórico.",
  },
];

function AjudaPage() {
    return (
        <>
        <AppHeader title="Ajuda" />
        
        <div className="mx-auto max-w-[1000px] px-6 py-8 lg:px-10 lg:py-10">
            <div className="grid gap-5 md:grid-cols-3">
                {[
                    { icon: BookOpen, title: "Guia de uso", text: "Passo a passo das rotinas." },
                    { icon: MessageSquare, title: "Falar com o time", text: "Canal interno de dados." },
                    { icon: LifeBuoy, title: "Abrir chamado", text: "Suporte téncnico do WaveHub PCOM."},
                ].map((c, i) => (
                    <button
                    key={c.title}
                    className="panel lift rise-in p-5 text-left"
                    style={{ animationDelay: `${i * 60}ms` }}
                    >
                    <span className="grid h-10 w-10 palce-items-center rounded-xl bg-primary/12 text-primary">
                    <c.icon className="h-5 w-5" />
                    </span>
                    <p className = "mt-1 text-xs text-muted-foreground">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.text}</p>
                    </button>
                ))}
            </div>

            <section className="panel rise-in mt-6 px-6 py-3">
                <Accordion type="single" collapsible>
                    {faq.map((item) => (
                        <AccordionItem key={item.q} value={item.q} className="border-border">
                            <AccordionTrigger className="text[13px] hover:no-underline">
                                {item.q}
                            </AccordionTrigger>
                            <accordionContent className="text-[13px] leading-relaxed text-muted-foreground">
                                {item.a}
                            </accordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <div className="panel mt-6 flex flex-col items-center gap-3 p-10 text-center">
                <p className="text-sm font-medium">Ainda com dúvidas?</p>
                <p className="max-w-sm text-xs text-muted-foreground">
                    A documentação interna cobre cada rotina do PCOM, incluindo pré-requisitos de sessão e tratamento de arquivos.
                </p>
                <Button className="mt-1 rounded-xl">Abrir documentação</Button>
            </div>
        </div>
        </>
    );
}