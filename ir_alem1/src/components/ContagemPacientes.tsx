import { useEffect, useState } from "react";
import { Paciente } from "../schemas/paciente";
import { fetchPacientes } from "../services/pacienteService";
import styles from "./ContagemPacientes.module.css";

export default function ContagemPacienteComponent(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState<Paciente[]>([]);
  
    const loadUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchPacientes();
        setUsers(data);
      } catch (err) {
        setError(`Error fetching users: ${err}`);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      loadUsers();
    }, []);

    return (
      <div className={styles.section}>
        <h1>Contagem de Pacientes</h1>
        {loading ? (
          <p className={styles.message}>Carregando...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <div>
            <div className={styles.countBadge}>{users.length}</div>
            <p className={styles.message}>pacientes cadastrados</p>
          </div>
        )}
      </div>
    );
}
