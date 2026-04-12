# CardioIA - Fase 2 (Resumo Estruturado para Agente de IA)

## 1) Contexto rapido
- Projeto: **Diagnostico Automatizado - IA no Estetoscopio Digital**.
- Tema central: NLP + classificacao de texto + analise de vieses/governanca de dados em saude.
- Meta da fase: simular apoio ao diagnostico e triagem clinica com IA, com dados estruturados e codigo funcional.

## 2) Regras e alertas da atividade avaliativa
- Conferir arquivo antes do upload final (sem reenvio apos fechamento/correcao).
- Nao deixar entrega para os minutos finais.
- Nao compartilhar respostas em grupos (risco de plagio e nota zero).
- Prazo de revisao de correcao: ate 15 dias apos publicacao da nota.

## 3) Objetivo geral
- Construir solucoes praticas de diagnostico automatizado com base em dados clinicos textuais.
- Relacionar sintomas e doencas por regras simples (mapa de conhecimento).
- Treinar classificador de risco textual (baixo/alto risco) com TF-IDF + ML.
- Refletir sobre qualidade, justica dos dados e governanca em IA.

## 4) Parte 1 - Extracao de sintomas + sugestao de diagnostico

### 4.1 Requisitos funcionais
1. Criar `sintomas.txt` com **10 frases completas** de pacientes.
2. Criar `conhecimento.csv` com associacoes de sintomas -> doenca.
   - Estrutura sugerida: `sintoma_1 | sintoma_2 | doenca_associada`.
   - Quanto mais linhas no CSV, melhor a cobertura de decisao.
3. Implementar codigo Python (`.py` ou `.ipynb`) para:
   - Ler as frases do `.txt`.
   - Detectar sintomas por expressoes do mapa de conhecimento.
   - Sugerir diagnostico provavel por frase.

### 4.2 Entregaveis obrigatorios
- Arquivo `.txt` com 10 frases de sintomas.
- Arquivo `.csv` com mapa de conhecimento (sintomas x diagnosticos).
- Codigo Python funcional de leitura, extracao e sugestao de diagnostico.

## 5) Parte 2 - Classificador basico de texto (risco)

### 5.1 Requisitos funcionais
1. Criar dataset `.csv` rotulado (frase, situacao), com classes:
   - `baixo risco`
   - `alto risco`
2. Vetorizar textos com **TF-IDF**.
3. Treinar modelo simples (ex.: Logistic Regression, Decision Tree, etc.).
4. Avaliar desempenho (minimo: acuracia + observacoes sobre comportamento em riscos diferentes e possiveis distorcoes).

### 5.2 Entregaveis obrigatorios
- Arquivo `.csv` com frases e rotulos.
- Notebook `.ipynb` com TF-IDF, treino e avaliacao.
- Repositorio publico no GitHub com todos os arquivos da Fase 2.
- Video (ate 4 min) no YouTube como `nao listado`, com link no `README.md` do repositorio.

## 6) Criterios de avaliacao (10 pontos)
| Criterio | Pontos |
|---|---:|
| Relatos e mapa de conhecimento organizados | 2 |
| Codigo de extracao de informacoes funcional | 2 |
| Dataset simples criado corretamente | 1 |
| Classificador treinado e testado corretamente | 2 |
| Documentacao clara + repositorio publico com README completo | 1 |
| Video demonstracao no YouTube (nao listado) com link no GitHub | 2 |

## 7) Ir Alem 1 (Front-end React + Vite)

### 7.1 Escopo
- Construir interface responsiva do portal CardioIA (sem back-end real).
- Dados simulados (JSON local ou API fake).

### 7.2 Requisitos tecnicos
- Autenticacao simulada via Context API (JWT fake em `localStorage`).
- Listagem de pacientes via API fake/base simulada.
- Formulario de agendamento com `useState` e `useReducer`.
- Dashboard com contagem de pacientes e consultas.
- Protecao de rotas com `AuthContext`.
- Estilizacao com CSS Modules ou Styled Components.

### 7.3 Entregaveis
- Repositorio publico: `nome-do-grupo-cardioia-portal`.
- Estrutura com pastas `/contexts`, `/components`, `/services`, `/pages`.
- `README.md` com instalacao/execucao.
- Lista com nome completo e RM dos integrantes.
- Video (ate 4 min), YouTube `nao listado`, link no README.

### 7.4 Criterios (qualitativos)
- Autenticacao e protecao de rotas funcionais.
- Consumo de API e controle de estado.
- Uso correto de Hooks (`useState`, `useEffect`, `useContext`).
- Boa componentizacao e organizacao.
- Responsividade e usabilidade.

## 8) Ir Alem 2 (MLP para ECG)

### 8.1 Escopo
- Classificacao binaria de imagens ECG (`normal` vs `anormal`) com MLP (Keras).

### 8.2 Requisitos tecnicos
- Dataset publico recomendado: Kaggle Heartbeat.
- Pre-processamento de imagens (ex.: redimensionar, tons de cinza).
- Criar, treinar e testar MLP.
- Avaliar acuracia.

### 8.3 Entregaveis
- Notebook `.ipynb` comentado e funcional.
- Repositorio publico com notebook, imagens exemplo e README.
- Video (ate 4 min), YouTube `nao listado`, link no README.

### 8.4 Criterios (qualitativos)
- Pre-processamento correto.
- Implementacao funcional da MLP.
- Treino e avaliacao com resultados.
- Organizacao e clareza do notebook.

## 9) Checklist operacional (para outro agente)
- [ ] Validar que os datasets existem e estao legiveis (`.txt` e `.csv`).
- [ ] Executar pipeline Parte 1 e gerar diagnosticos para as 10 frases.
- [ ] Executar pipeline Parte 2 (TF-IDF, treino, teste, metricas).
- [ ] Atualizar `README.md` com objetivos, execucao e evidencias.
- [ ] Confirmar repositorio publico no GitHub.
- [ ] Produzir video curto demonstrando fluxo completo.
- [ ] Inserir link do video no README.

## 10) Definicao de pronto (DoD)
- Parte 1 funcional com extracao e sugestao de diagnostico.
- Parte 2 funcional com classificador e avaliacao minima reportada.
- Documentacao clara e reprodutivel no repositorio publico.
- Evidencia em video publicada e linkada.

