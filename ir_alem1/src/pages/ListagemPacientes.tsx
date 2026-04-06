import { useState, useEffect } from 'react';
import { Paciente } from '../schemas/paciente';
import { fetchPacientes } from '../services/pacienteService';
import styles from './ListagemPacientes.module.css';

export default function ListagemPacientes() {
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
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1>Listagem de Pacientes</h1>
        </div>

        {loading ? (
          <p className={styles.loadingMsg}>Carregando...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : users.length === 0 ? (
          <p className={styles.emptyMsg}>Nenhum paciente encontrado.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Endereço</th>
                  <th>Telefone</th>
                  <th>Website</th>
                  <th>Empresa</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                    </td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
