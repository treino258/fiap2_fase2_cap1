import { Agendamento } from '../schemas/agentamento';
import { useAgendamento } from '../contexts/agendamentoContext';
import styles from './ListagemAgendamentosComponent.module.css';

export default function ListagemAgendamentosComponent() {
    
    const agendamentoContext = useAgendamento();

    return (
        <div className={styles.section}>
            <h1>Listagem de Agendamentos</h1>
            {agendamentoContext.agendamentos.length === 0 ? (
                <p className={styles.empty}>Nenhum agendamento encontrado.</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Paciente</th>
                                <th>Telefone</th>
                                <th>Data</th>
                                <th>Obs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentoContext.agendamentos.map((agendamento: Agendamento, index: number) => (
                                <tr key={index}>
                                    <td>{agendamento.name}</td>
                                    <td>{agendamento.phone}</td>
                                    <td>{new Date(agendamento.date).toLocaleString()}</td>
                                    <td>{agendamento.obs}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
