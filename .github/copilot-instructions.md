# Copilot Instructions — CardioIA (fiap2_fase2_cap1)

## Repository Summary
Academic project for FIAP – "CardioIA: Automated Cardiac Triage". It contains:
- **`src/`** — Python/Jupyter pipeline for NLP-based cardiac triage (rule-based + ML classifiers using TF-IDF).
- **`ir_alem1/`** — React 19 + Vite 7 + TypeScript 6 SPA: a simulated cardiology portal (auth, patient listing, appointment scheduling, dashboard).
- **`ir_alem2/`** — Jupyter notebook with MLP/Conv+MLP for binary ECG classification (Google Colab).
- **`assets/`** — Datasets (`sintomas.txt`, `conhecimento.csv`, `triagem.csv`, `sintomas_rotulados.csv`) and result images.
- **Root files:** `README.md`, `requirements.txt`, `enunciado.md`, `.gitignore`.

No CI/CD workflows exist. No test framework exists in any sub-project.

---

## Python Sub-project (`src/`, root-level)

### Runtime
- Python 3.12 (system). The Jupyter notebook (`src/cardioia_fase2.ipynb`) is the main artifact.

### ⚠️ Known Issue: `requirements.txt` is broken
`requirements.txt` lists `os` (a Python stdlib module, not a pip package). Running `pip install -r requirements.txt` will fail. **Always install manually:**
```bash
pip install pandas scikit-learn matplotlib joblib numpy
```

### Run the notebook
```bash
pip install pandas scikit-learn matplotlib joblib numpy
jupyter notebook src/cardioia_fase2.ipynb
```
- Trained models are saved to `src/models/cardioia_modelo.pkl` and `src/models/cardioia_tfidf.pkl`.
- Datasets are under `assets/DataSet/parte1/` and `assets/DataSet/parte2/`.

---

## Frontend Sub-project (`ir_alem1/`)

### Runtime
- Node.js v24, npm v11. Vite 7, React 19, TypeScript 6.

### Bootstrap (must always do before build/lint/run)
```bash
cd ir_alem1
npm install
```

### Build (production)
```bash
cd ir_alem1
npm run build     # Outputs to ir_alem1/dist/ — succeeds (~1.7s)
```

### TypeScript type-check
```bash
cd ir_alem1
npm run typecheck   # Passes cleanly
```

### Lint
```bash
cd ir_alem1
npm run lint        # ESLint with typescript-eslint
```
**⚠️ Pre-existing lint errors (do not fix unless that is the task):**
1. `src/components/RequestApi.jsx` — `react-hooks/set-state-in-effect`: calling `setLoading(true)` synchronously inside `useEffect`.
2. `src/schemas/agentamento.ts` — `@typescript-eslint/no-explicit-any`: `arg: any` in the Zod schema preprocessor.

These errors existed before your change. Only fix them if the task specifically targets these files.

### Dev server
```bash
cd ir_alem1
npm run dev         # http://localhost:5173
```

### Scripts summary
| Command | Effect |
|---|---|
| `npm run dev` | Dev server with HMR at localhost:5173 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | `tsc --noEmit` (no output = success) |
| `npm run lint` | ESLint (2 pre-existing errors) |

---

## Architecture: `ir_alem1/src/`

```
src/
├── App.tsx                   # Router + layout shell
├── main.jsx                  # Entry point — mounts BrowserRouter, AuthProvider, AgendamentoProvider
├── constants/app_constants.ts
├── contexts/
│   ├── authContext.tsx        # useAuth(), AuthProvider — fake JWT via btoa, token in localStorage key "token"
│   └── agendamentoContext.tsx # useAgendamento(), AgendamentoProvider — useReducer, persists to localStorage key "agendamentos"
├── components/
│   ├── NavBar.tsx / .module.css
│   ├── ProtectedRoute.tsx     # <AccessDenied> wrapper — redirects to /login if not authenticated
│   ├── ContagemPacientes.tsx  # Dashboard widget: patient count
│   ├── ListagemAgendamentosComponent.tsx
│   ├── RequestApi.jsx         # Demo component (unused in main flow)
│   └── forms/
│       ├── AgendamentoForm.tsx
│       └── UserForm.tsx
├── pages/
│   ├── Home.jsx               # Dashboard (ContagemPacientes + ListagemAgendamentos)
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ListagemPacientes.tsx  # Protected — fetches from JSONPlaceholder /users
│   ├── AgendamentoPage.tsx    # Protected
│   └── NotFound.jsx
├── schemas/
│   ├── user.ts                # Zod schema: { name, password }
│   ├── paciente.ts
│   └── agentamento.ts         # Zod schema with date preprocess (note: filename typo "agentamento")
└── services/
    ├── pacienteService.ts     # GET https://jsonplaceholder.typicode.com/users
    └── postService.js         # GET https://jsonplaceholder.typicode.com/posts
```

### Key patterns
- Protected routes use `<AccessDenied>` (from `ProtectedRoute.tsx`), not a separate `<ProtectedRoute>` component.
- Auth state: `AuthContext` with `user: User | null`; authentication = `user !== null`.
- Appointments state: `AgendamentoContext` backed by `useReducer` with `ADD`/`REMOVE` actions.
- Forms use `react-hook-form` + Zod resolver (`@hookform/resolvers/zod`).
- Styling: CSS Modules (`.module.css` co-located with each component/page).
- Config files: `vite.config.js`, `eslint.config.js`, `tsconfig.json` (all at `ir_alem1/` root).

---

## Key Constraints

- No test infrastructure — do not add or run tests.
- No CI pipelines — validate changes locally using `npm run typecheck` and `npm run build`.
- `npm run lint` will always show 2 pre-existing errors; this is expected.
- The `ir_alem2/` notebook is designed for Google Colab only — do not run locally.
- Trust these instructions; do not re-explore what is already documented here.
