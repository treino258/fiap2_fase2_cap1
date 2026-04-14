# CardioIA – Diagnóstico Visual em Cardiologia com MLP

## Descrição

Projeto de classificação binária de sinais de ECG (**normal** vs. **anormal**) utilizando dois modelos com Keras/TensorFlow: um **MLP Puro** (Perceptron Multicamadas) e um **Conv+MLP** (camadas convolucionais + camadas densas). Os sinais do PTB Diagnostic ECG Database são convertidos em imagens de forma de onda em tons de cinza (64×64), pré-processados e classificados. Os modelos são comparados lado a lado.

## Dataset

- **Fonte:** [Heartbeat – Kaggle](https://www.kaggle.com/datasets/shayanfazeli/heartbeat)
- **Subconjunto:** PTB Diagnostic ECG Database
- **Arquivos:** `ptbdb_normal.csv` e `ptbdb_abnormal.csv`
- **Amostras:** ~14.552 (2 classes)
- **Dimensão:** 187 pontos do sinal + 1 coluna de label (188 colunas)
- **Frequência:** 125 Hz

## Pipeline

```
Sinal ECG (1D, 187 pontos)
    │
    ▼
Imagem Waveform (64×64 grayscale)
    │
    ├──────────────────────────────────────────┐
    ▼                                          ▼
  MODELO A – MLP Puro                  MODELO B – Conv + MLP
  Flatten(4096)                        Conv2D(32) → BN → Pool
  → Dense(512) → BN → Drop(0.3)       Conv2D(64) → BN → Pool
  → Dense(256) → BN → Drop(0.3)       Conv2D(128) → BN → Pool
  → Dense(128) → BN → Drop(0.2)       → Flatten
  → Dense(64) → Drop(0.2)             → Dense(256) → Drop(0.4)
  → Dense(1, Sigmoid)                 → Dense(128) → Drop(0.3)
                                       → Dense(1, Sigmoid)
    │                                          │
    └──────────────┬───────────────────────────┘
                   ▼
        Comparação: Acurácia, ROC, Matrizes de Confusão
```

## Estrutura do Repositório

```
├── CardioIA_MLP_ECG.ipynb   # Notebook principal (Google Colab)
├── README.md                # Documentação do projeto
└── .gitignore               # Arquivos ignorados pelo Git
```

## Como Executar

1. Abra o notebook no Google Colab:
   - Faça upload do arquivo `CardioIA_MLP_ECG.ipynb` ou abra diretamente do GitHub
2. Execute todas as células em sequência (`Runtime → Run all`)
3. Na primeira execução, o dataset será baixado automaticamente via `kagglehub`
   - Pode ser necessário autenticar com sua conta Kaggle

> **Nota:** a conversão dos ~14.5k sinais em imagens pode levar 10–20 min no Colab.

### Pré-requisitos (já disponíveis no Colab)

- Python 3.x
- TensorFlow / Keras
- NumPy, Pandas, Matplotlib, Seaborn
- OpenCV (`cv2`)
- scikit-learn
- kagglehub

## Resultados Obtidos

### Tabela Comparativa (Conjunto de Teste – 2.911 amostras)

| Métrica | MLP Puro | Conv + MLP |
|---------|----------|------------|
| **Acurácia** | 93% | **97%** |
| **AUC-ROC** | 0.9871 | **0.9947** |
| Precision (Normal) | 0.84 | **0.97** |
| Recall (Normal) | **0.95** | 0.94 |
| F1 (Normal) | 0.89 | **0.95** |
| Precision (Anormal) | 0.98 | **0.98** |
| Recall (Anormal) | 0.93 | **0.99** |
| F1 (Anormal) | 0.95 | **0.98** |

### Análise

- **MLP Puro (93%):** Resultado sólido para um modelo sem convoluções. Alta recall para Normal (0.95) mostra boa detecção de pacientes saudáveis. A menor precision (0.84) indica que alguns casos anormais são classificados como normais.
- **Conv+MLP (97%):** Supera o MLP em todas as métricas. Recall de 0.99 para Anormal é crucial em contexto clínico — quase nenhum paciente doente é perdido.
- **Curva ROC:** Ambos têm AUC > 0.98, mas o Conv+MLP domina na região de baixo FPR (poucos falsos positivos), crítico em diagnóstico médico.

### Visualizações Geradas

O notebook produz:
- Gráficos de análise exploratória dos sinais ECG
- Exemplos de imagens waveform geradas (64×64 grayscale)
- Curvas de acurácia e loss (treino/validação) para ambos os modelos
- Matrizes de confusão lado a lado
- Curva ROC comparativa com AUC
- Classification reports completos (precision, recall, F1)
- Predições visuais comparando MLP vs Conv+MLP vs label real

## Decisões Técnicas

- **Dois modelos para comparação:** MLP puro (requisito da atividade) + Conv+MLP (para demonstrar o impacto de features espaciais)
- **PTB (não MIT-BIH):** Classificação binária alinhada ao enunciado
- **Imagens 64×64:** Equilíbrio entre qualidade visual e dimensionalidade
- **Split 60/20/20:** Conjuntos explícitos de treino, validação e teste (estratificados)
- **Class weights balanceados:** Compensa desbalanceamento entre classes (~2.6x mais anormais)
- **EarlyStopping (patience=10):** Previne overfitting com restauração dos melhores pesos
- **BatchNormalization no MLP:** Estabiliza gradientes e melhora convergência
- **Learning rate reduzido no MLP (0.0005):** Evita oscilações do MLP puro



## Video
    https://www.youtube.com/watch?v=-4_VQP2DVqs

## Autores

    Pedro L. T. Silva
    Alice C. M. Assis - RM 566233
    Leonardo S. Souza - RM 563928
    Lucas B. Francelino - RM 561409
    Pedro L. T. Silva - RM 561644
    Vitor A. Bezerra - RM 563001

## Licença

Projeto acadêmico – FIAP
