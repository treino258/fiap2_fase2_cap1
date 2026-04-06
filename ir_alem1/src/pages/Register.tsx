import { appName } from "../constants/app_constants";
import { useAuth } from '../contexts/authContext';
import UserForm from "../components/forms/UserForm";
import styles from "./Register.module.css";

export default function RegisterPage() {
  const loginContext = useAuth();

  if (loginContext.user) {
    return (
      <div className={styles.page}>
        <div className={styles.alreadyLoggedCard}>
          <h1>Você já está logado como {loginContext.user.name}!</h1>
          <p>Faça logout para registrar uma nova conta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Criar Conta</h1>
        <h2>Crie sua conta no {appName} para começar a usar nossos serviços.</h2>
        <UserForm />
      </div>
    </div>
  );
}
