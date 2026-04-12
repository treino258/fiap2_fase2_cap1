import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Agendamento } from '../schemas/agentamento';
import { useAuth } from '../contexts/authContext';

type State = { agendamentos: Agendamento[] };

type Action =
  | { type: 'ADD'; payload: Agendamento }
  | { type: 'REMOVE'; payload: { index: number } };

const initialState: State = { agendamentos: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { agendamentos: [...state.agendamentos, action.payload] };
    case 'REMOVE':
      return { agendamentos: state.agendamentos.filter((_, i) => i !== action.payload.index) };
    default:
      return state;
  }
}

interface AgendamentoContextType {
  agendamentos: Agendamento[];
  agendar: (agendamento: Agendamento) => void;
  removerAgendamento: (index: number) => void;
  contagemAgendamentos: () => number;
}

const AgendamentoContext = createContext<AgendamentoContextType | undefined>(undefined);

export function AgendamentoProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();

  // lazy initializer para carregar do localStorage
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    () => {
      try {
        const raw = localStorage.getItem('agendamentos');
        return raw ? { agendamentos: JSON.parse(raw) as Agendamento[] } : initialState;
      } catch {
        return initialState;
      }
    }
  );

  useEffect(() => {
    localStorage.setItem('agendamentos', JSON.stringify(state.agendamentos));
  }, [state.agendamentos]);

  const agendar = (agendamento: Agendamento) => {
    if (!auth.user) throw new Error('Usuário deve estar logado para agendar');
    dispatch({ type: 'ADD', payload: agendamento });
  };

  const removerAgendamento = (index: number) => {
    if (!auth.user) throw new Error('Usuário deve estar logado para excluir agendamento');
    dispatch({ type: 'REMOVE', payload: { index } });
  };

  const contagemAgendamentos = () => {
    if (!auth.user) throw new Error('Usuário deve estar logado para ver a contagem de agendamentos');
    return state.agendamentos.length;
  };

  return (
    <AgendamentoContext.Provider
      value={{
        agendamentos: state.agendamentos,
        agendar,
        removerAgendamento,
        contagemAgendamentos
      }}
    >
      {children}
    </AgendamentoContext.Provider>
  );
}

export const useAgendamento = (): AgendamentoContextType => {
  const ctx = useContext(AgendamentoContext);
  if (!ctx) throw new Error('useAgendamento must be used within an AgendamentoProvider');
  return ctx;
};