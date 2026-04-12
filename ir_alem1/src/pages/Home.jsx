import ContagemPacienteComponent from '../components/ContagemPacientes';
import ListagemAgendamentosComponent from '../components/ListagemAgendamentosComponent';
import { appName } from '../constants/app_constants';
import { useAuth } from '../contexts/authContext';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const authContext = useAuth();
  const isAuthenticated = authContext.user !== null;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>🏠 Bem-vindo ao {appName}!</h1>
        {isAuthenticated ? (
          <p>Olá, {authContext.user.name}! Gerencie seus pacientes e agendamentos abaixo.</p>
        ) : (
          <>
            <p>Faça login para acessar o painel completo de funcionalidades.</p>
            <div className={styles.ctaLinks}>
              <Link to="/login" className={styles.ctaBtn}>Entrar</Link>
              <Link to="/register" className={styles.ctaBtn}>Criar Conta</Link>
            </div>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className={styles.dashboard}>
          <ContagemPacienteComponent />
          <ListagemAgendamentosComponent />
        </div>
      )}
    </div>
  );
}
