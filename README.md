<div align="center">

# 🚀 PCOM WaveHub

### Central de Automação para o PCOM

Uma aplicação desktop desenvolvida para centralizar, automatizar e monitorar processos executados no PCOM, eliminando tarefas repetitivas, reduzindo erros operacionais e acelerando a geração de informações para o negócio.

---

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Windows](https://img.shields.io/badge/Windows-10+-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</div>

---

# 📖 Sobre o projeto

O **PCOMM WaveHub** nasceu com o objetivo de ser uma plataforma única para todas as automações relacionadas ao PCOM.

Ao invés de possuir diversos scripts separados, a aplicação centraliza todas as rotinas em uma interface desktop intuitiva, permitindo executar processos com apenas alguns cliques.

A ideia é que, conforme novas necessidades surgirem, novas automações sejam incorporadas ao sistema, tornando-o um verdadeiro hub de produtividade.

---

# ✨ Funcionalidades

Atualmente o projeto possui:

- 📊 Atualização automática do BI de Acertos
- 📄 Atualização automática do BI de Notas Fiscais
- 📦 Extração de dados do PCOM
- 📈 Geração de relatórios
- 🔄 Atualizações automatizadas
- 🗂 Organização automática dos arquivos
- 📁 Exportação para CSV e Parquet
- 📜 Logs detalhados de execução
- ⚙️ Configuração simplificada
- 🖥 Interface Desktop amigável

E muitas outras automações serão adicionadas futuramente.

---

# 🎯 Objetivos

- Automatizar processos repetitivos
- Padronizar execuções
- Reduzir erros humanos
- Diminuir tempo operacional
- Facilitar manutenção das automações
- Centralizar todas as rotinas em uma única aplicação

---

# 🏗 Arquitetura

```text
PCOM WaveHub
│
├── 🖥 Interface Desktop
│
├── ⚙️ Gerenciador de Automações
│      │
│      ├── BI Acertos
│      ├── BI Notas Fiscais
│      ├── Relatórios
│      ├── Extrações
│      └── Novos módulos...
│
├── 📂 Pipeline de Dados
│      ├── Bronze
│      ├── Silver
│      └── Gold
│
├── 📜 Sistema de Logs
│
└── ⚡ Serviços Compartilhados
```

---

# 📦 Estrutura do projeto

```text
project/
│
├── app/
│
├── automations/
│   ├── acertos/
│   ├── notas_fiscais/
│   ├── ...
│
├── infrastructure/
│
├── services/
│
├── config/
│
├── logs/
│
└── README.md
```

---

# 🚀 Como funciona

Cada automação funciona como um módulo independente.

A interface apenas dispara o processo desejado.

Fluxo geral:

```text
Usuário
      │
      ▼
Seleciona Automação
      │
      ▼
Inicialização
      │
      ▼
Login / Sessão
      │
      ▼
Extração
      │
      ▼
Tratamento
      │
      ▼
Atualização
      │
      ▼
Log de Execução
```

---

# 🖥 Interface

A aplicação contará com uma interface desktop para facilitar o uso das automações.

Exemplo:

```text
+------------------------------------------------+
|              PCOM WaveHub            |
+------------------------------------------------+
|                                                |
|  ▶ Atualizar BI de Acertos                     |
|                                                |
|  ▶ Atualizar BI de Notas Fiscais               |
|                                                |
|  ▶ Gerar Relatórios                            |
|                                                |
|  ▶ Executar Extrações                          |
|                                                |
|  ▶ Configurações                               |
|                                                |
|  ▶ Histórico                                   |
|                                                |
+------------------------------------------------+
```

---

# 📈 Escalabilidade

O projeto foi pensado para crescer continuamente.

Sempre que surgir uma nova necessidade operacional, basta desenvolver um novo módulo e integrá-lo ao sistema.

Exemplo:

```text
Automações

├── BI Acertos
├── BI Notas
├── BI Cancelamentos
├── BI Separação
├── BI Expedição
├── Relatório X
├── Relatório Y
├── Extração Z
└── ...
```

---

# 🛠 Tecnologias

- Python
- Pandas
- DuckDB
- PyArrow
- PyQt6
- Logging
- Parquet
- CSV

---

# 📜 Logs

Todas as execuções serão registradas automaticamente.

Exemplo:

```text
[10:22:13] Atualização BI Acertos iniciada
[10:22:25] Login realizado
[10:23:08] Download concluído
[10:23:41] Tratamento dos dados finalizado
[10:24:10] BI atualizado com sucesso
```

---

# 🔮 Roadmap

## Versão 1.0

- [ ] Estrutura do projeto
- [ ] Sistema de logs
- [ ] Atualização BI Acertos
- [ ] Interface Desktop
- [ ] Atualização BI Notas Fiscais

## Versão 2.0

- [ ] Agendamento de execuções
- [ ] Sistema de notificações
- [ ] Histórico de execuções
- [ ] Configurações avançadas

## Futuro

- [ ] Plugins de automações
- [ ] Dashboard interno
- [ ] Atualizações automáticas
- [ ] Execuções paralelas

---

# 🤝 Contribuindo

Novas automações podem ser adicionadas seguindo o padrão de módulos da aplicação.

Cada automação deve possuir:

- Processo independente
- Logs próprios
- Tratamento de erros
- Configuração isolada
- Fácil integração com a interface

---

# 📄 Licença

Este projeto é distribuído sob a licença MIT.

---

<div align="center">

### 💡 "Automatize uma tarefa uma vez. Economize horas todos os dias."

**PCOM WaveHub**

</div>