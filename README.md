# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
<a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# CardioIA – Diagnóstico Automatizado – IA no Estetoscópio Digital

## Atividade em Grupo: FIAP - 2026/3 - Fase2 Cap1

## 👨‍🎓 Integrantes: 
- <a href="">Alice C. M. Assis - RM 566233</a>
- <a href="">Leonardo S. Souza - RM 563928</a>
- <a href="">Lucas B. Francelino - RM 561409</a> 
- <a href="">Pedro L. T. Silva - RM 561644</a> 
- <a href="">Vitor A. Bezerra - RM 563001</a>

## 👩‍🏫 Professores:
### Tutor(a)
- <a>Caique Nonato da Silva Bezerra</a>
### Coordenador(a)
- <a href="profandre.chiovato@fiap.com.br">André Godoi Chiovato</a>


# CardioIA — Triagem Inteligente em Cardiologia

> *"O estetoscópio digital do século XXI."*

Doenças cardiovasculares são a principal causa de morte no mundo. O diagnóstico precoce depende de profissionais especializados e exames que nem sempre são acessíveis. Este projeto constrói uma ferramenta de triagem inteligente que auxilia na identificação de pacientes em alto risco cardíaco com base em relatos clínicos textuais — democratizando um primeiro nível de avaliação preventiva.

---

## Contexto Clínico — Manchester Triage System

O **Manchester Triage System (MTS)** é um protocolo de triagem clínica criado em 1994 na Inglaterra e amplamente utilizado em pronto-socorros no Brasil. Ele classifica pacientes em 5 níveis de prioridade por cor:

| Cor | Nível | Tempo máximo de atendimento |
|---|---|---|
| 🔴 Vermelho | Emergência | Imediato |
| 🟠 Laranja | Muito urgente | 10 minutos |
| 🟡 Amarelo | Urgente | 60 minutos |
| 🟢 Verde | Pouco urgente | 120 minutos |
| 🔵 Azul | Não urgente | 240 minutos |

O processo começa pelo **sintoma principal** relatado pelo paciente. A partir daí, o profissional segue fluxogramas com perguntas que afunilam a gravidade.

Este projeto **simplifica conscientemente** essa lógica para fins acadêmicos, aplicando classificação binária (alto risco / baixo risco). As classes vermelho e laranja do protocolo original mapeiam para **alto risco**; verde e azul mapeiam para **baixo risco**. Essa limitação é documentada intencionalmente — reconhecê-la é parte do exercício de desenvolvimento responsável de IA.

---

## Objetivo

Desenvolver um módulo inteligente capaz de analisar relatos clínicos textuais, reconhecer sintomas cardíacos e propor diagnósticos assistidos — demonstrando na prática a diferença entre um **sistema baseado em regras** e um **sistema que aprende com dados**.

---

## Estrutura do Projeto

```
cardioia-fase2/
├── assets/
│   └── DataSet/
│       ├── parte1/
│       │   ├── sintomas.txt
│       │   ├── conhecimento.csv
│       │   └── resultados_diagnostico.csv
│       └── parte2/
│           ├── sintomas_rotulados.csv
│           └── triagem.csv
├── src/
│    ├── models/
│    │   ├── cardioia_modelo.pkl
│    │   └── cardioia_tfidf.pkl
│    └── cardioia_fase2.ipynb
├── README.md
├── .gitignore
└── requirements.txt
```

---

## Ir Além 1 — Portal Front-end (React + Vite)

Módulo web com autenticação simulada, listagem de pacientes, dashboard e agendamento de consultas, desenvolvido para o escopo de interface do projeto CardioIA.

➡️ Documentação específica: [`ir_alem1/README.md`](ir_alem1/README.md)

---

## Ir Além 2 — Classificação de ECG com MLP

Módulo de visão computacional para classificação binária de sinais de ECG (normal vs anormal), com notebook em Google Colab e comparação de arquiteturas.

➡️ Documentação específica: [`ir_alem2/README.md`](ir_alem2/README.md)

---

## Parte 1 — Sistema Baseado em Regras

### Como funciona

O código lê cada frase do arquivo `sintomas.txt` e compara com o mapa de conhecimento (`conhecimento.csv`). Para cada frase, percorre as 40 regras do mapa e conta quantos sintomas de cada regra aparecem no texto. A regra com maior correspondência gera o diagnóstico sugerido, com nível de gravidade e especialidade recomendada.

```
Frase do paciente → Extração de palavras-chave → Matching com conhecimento.csv → Diagnóstico sugerido
```

### Arquivos

| Arquivo | Descrição |
|---|---|
| `sintomas.txt` | 30 relatos simulados de pacientes cardiológicos |
| `conhecimento.csv` | 40 associações entre sintomas, diagnósticos, gravidade e especialidade |

### Limitação intencional

O sistema de regras só reconhece o que foi explicitamente mapeado. Se um paciente descrever "meu peito tá pesado" em vez de "aperto no tórax", o sistema falha — porque depende de vocabulário fixo. Essa fragilidade é o argumento central que justifica a existência da Parte 2.

---

## Parte 2 — Classificador com Machine Learning

### Como funciona

Em vez de programar regras manualmente, o modelo **aprende padrões** a partir de exemplos rotulados. O pipeline completo é:

```
triagem.csv → TF-IDF (vetorização) → Modelo ML → Classificação de risco → Avaliação
```

### Por que TF-IDF?

TF-IDF foi escolhido porque os dados são frases curtas em português, sem imagens ou estrutura complexa. A técnica ignora palavras genéricas como "sinto" e "tenho", que aparecem em quase todas as frases, e dá mais peso a termos específicos como "irradiação" e "sufocamento", que realmente distinguem os níveis de risco. É a ferramenta certa para esse volume e tipo de dado.

Usamos `ngram_range=(1,2)` para que o modelo considere também pares de palavras consecutivas — "suor frio" e "dor no peito" como features, não só "suor" e "dor" isolados.

### Por que não apenas regras?

| | Sistema de Regras (Parte 1) | Machine Learning (Parte 2) |
|---|---|---|
| Conhecimento | Programado manualmente | Aprendido dos dados |
| Flexibilidade | Baixa — vocabulário fixo | Alta — generaliza variações |
| Transparência | Total | Parcial |
| Necessidade de dados | Não | Sim |
| Falha típica | Não reconhece variações de linguagem | Precisa de volume suficiente de dados |

### Modelos utilizados e justificativas

Treinamos e comparamos quatro configurações:

**Regressão Logística** — aprende um peso para cada palavra do vocabulário TF-IDF. Palavras como "irradiação" e "sufocamento" recebem pesos altos para "alto risco". É rápida, generaliza bem com poucos dados e devolve probabilidades, o que permite ajustar o threshold de decisão.

**Árvore de Decisão** — cria regras do tipo "SE contém X E contém Y → alto risco". Mais interpretável, mas tende a memorizar os dados de treino se não limitada. Usamos `max_depth=5` para controlar esse problema.

Usamos `max_depth=5` porque descobrimos empiricamente que a partir de `depth=4` o modelo já atinge 100% de acurácia no treino — e a acurácia no teste para de melhorar. Aumentar o depth além disso não muda nada no teste: o modelo passa a decorar as frases de treino em vez de aprender padrões generalizáveis. Esse fenômeno se chama **overfitting**.

Testamos também com **Naive Bayes** como terceiro modelo de comparação, desenvolvido especificamente para classificação de texto com datasets pequenos.

**Por que não Random Forest ou SVM?** Com 79 amostras, esses modelos mais complexos não têm dados suficientes para aproveitar suas vantagens. Usar ferramentas mais poderosas do que o problema exige não é uma boa prática de engenharia.

### O problema da acurácia sozinha

A acurácia de 75% obtida na avaliação inicial escondia um problema sério: o **recall da classe "alto risco" era de apenas 33%**, ou seja, o modelo identificou corretamente apenas 2 dos 6 casos graves no conjunto de teste. Os outros 4 foram classificados como baixo risco — **falsos negativos**.

Em triagem clínica, um falso negativo significa que um paciente em situação grave vai para casa sem atendimento prioritário. Esse tipo de erro é muito mais perigoso do que um falso positivo. A acurácia sozinha não é uma métrica suficiente para avaliar sistemas de saúde.

### Problema de desbalanceamento e solução

O dataset tem 49 amostras de baixo risco e 30 de alto risco. Esse desbalanceamento faz o modelo aprender que "prever baixo risco com mais frequência" aumenta sua pontuação geral. O resultado aparece na matriz de confusão: o modelo acertava quase todos os casos de baixo risco, mas errava a maioria dos casos de alto risco.

**Solução 1 — `class_weight='balanced'`:** adicionamos esse parâmetro nos modelos, que penaliza mais os erros na classe minoritária multiplicando internamente o peso de cada amostra de alto risco por aproximadamente 1,63 (proporção 49/30). Não altera os dados — só muda o quanto o modelo penaliza cada tipo de erro.

**Solução 2 — Ajuste do threshold:** por padrão o modelo classifica como alto risco se a probabilidade for maior que 50%. Reduzimos esse limiar para 35%, o que faz o modelo ser mais conservador — declara alto risco com menos certeza, reduzindo os falsos negativos. Em triagem clínica, esse tradeoff é intencional e desejável.

**Por que não usamos SMOTE?** SMOTE cria amostras sintéticas da classe minoritária interpolando entre exemplos existentes. Funciona bem para dados numéricos, mas para texto curto como o nosso ela é inadequada — interpolar vetores TF-IDF não produz frases coerentes, apenas ruído.

### Avaliação com Cross-Validation

O split único de 80/20 gerava resultados instáveis porque 16 amostras de teste são poucas — cada erro equivale a 6,25 pontos percentuais de acurácia, e o resultado depende de qual sorteio caiu no teste.

Implementamos **cross-validation estratificada com 5 folds**: os dados são divididos em 5 partes, e em cada rodada uma parte diferente vira teste enquanto as outras 4 viram treino. No final temos 5 medições independentes. A média e o desvio padrão juntos dão uma estimativa muito mais confiável do que um único número.

O cross-validation **não aumenta a quantidade de dados** — usa as mesmas 79 amostras de forma mais inteligente, garantindo que cada amostra participe do teste exatamente uma vez.

### Resultados — Cross-Validation 5-fold

| Modelo | Acurácia | Recall alto risco | F1 alto risco |
|---|---|---|---|
| Regressão Logística | 97,5% ± 3,1% | 93,3% ± 8,2% | 96,4% ± 4,5% |
| Naive Bayes | 88,6% ± 2,6% | 70,0% ± 6,7% | 82,2% ± 4,4% |
| Árvore de Decisão | 79,7% ± 5,1% | 76,7% ± 8,2% | 74,1% ± 6,5% |
| Árvore Balanceada | — | — | — |

A Regressão Logística com `class_weight='balanced'` foi a vencedora em todas as métricas. O desvio padrão de ±3,1% na acurácia indica estabilidade — o modelo não depende de um sorteio específico de dados.

### Teste com dados externos

Para provar que o modelo generaliza além do dataset de treino, testamos as 30 frases do `sintomas.txt` — rotuladas pelo grupo e completamente ausentes do `triagem.csv`.

**Resultado: 90% de acurácia em dados nunca vistos pelo modelo.**

Os 3 erros cometidos (todos falsos negativos) revelaram um padrão claro: o modelo falha em casos de alto risco que não mencionam explicitamente palavras cardíacas diretas como "dor no peito", "irradiação" ou "suor frio". Casos graves que se manifestam de forma atípica — tontura, desmaio, cansaço progressivo sem dor — são classificados erroneamente como baixo risco. Essa é uma limitação real do modelo que um sistema em produção precisaria endereçar com mais dados e features adicionais como sinais vitais.

#### Salvamento do modelo

Após identificar a Regressão Logística Balanceada como o melhor modelo, treinamos a versão final com **todos os dados disponíveis** do `triagem.csv` — sem split de teste, já que o desempenho foi validado pelo cross-validation. O modelo e o vetorizador são salvos separadamente com `joblib`:

```python
import joblib

joblib.dump(modelo_salvo, 'cardioia_modelo.pkl')
joblib.dump(tfidf_final,  'cardioia_tfidf.pkl')
```

Os dois arquivos são inseparáveis: o modelo aprendeu com os vetores que aquele TF-IDF específico gerou. Carregar o modelo com um TF-IDF diferente produziria resultados incorretos porque as colunas dos vetores não bateriam.

Para carregar e usar o modelo em qualquer outro código:

```python
import joblib

modelo = joblib.load('cardioia_modelo.pkl')
tfidf  = joblib.load('cardioia_tfidf.pkl')

nova_frase = ["sinto dor no peito com irradiação para o braço esquerdo"]
vetor = tfidf.transform(nova_frase)
print(modelo.predict(vetor))  # ['alto risco']

### Arquivos

| Arquivo | Descrição |
|---|---|
| `triagem.csv` | 79 frases rotuladas pelo grupo (alto risco / baixo risco) |
| `sintomas_rotulados.csv` | 30 frases do sintomas.txt rotuladas para teste externo |
| `cardioia_fase2.ipynb` | Notebook completo com toda a Parte 2 |
| `cardioia_modelo.pkl` | Modelo treinado serializado — pronto para uso |
| `cardioia_tfidf.pkl` | Vetorizador TF-IDF serializado — deve acompanhar o modelo |

---

## Reflexão — IA Responsável

Este projeto toca em um dos dilemas centrais da IA aplicada à saúde: **um modelo que erra para o lado errado pode custar vidas**.

Classificar um infarto como baixo risco é infinitamente mais grave do que classificar ansiedade como alto risco. Por isso, observamos especialmente os **falsos negativos** em todas as avaliações — e todas as decisões de ajuste do modelo (class_weight, threshold, cross-validation) foram motivadas por reduzir esse tipo de erro específico.

Sistemas reais de triagem nunca substituem o julgamento clínico. Eles auxiliam, priorizam e alertam. Este projeto replica essa filosofia em escala acadêmica — e documenta suas limitações com a mesma seriedade com que documenta seus resultados.

---
## Como Executar

```bash
# 1. Clone o repositório
git clone https://github.com/treino258/fiap2_fase2_cap1
cd fiap2_fase2_cap1

# 2. Instale as dependências
pip install -r requirements.txt

# 3. Execute o notebook
jupyter notebook src/cardioia_fase2.ipynb
```

O `requirements.txt` contém:
```
pandas==2.3.3
scikit-learn==1.8.0
matplotlib==3.10.8
joblib==1.5.3
numpy==2.4.1
```
## Demonstração

> 🎥 Link do vídeo no YouTube: `[a ser adicionado]`
