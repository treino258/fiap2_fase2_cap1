import { useAuth } from "../contexts/authContext";
import UserForm from "../components/forms/UserForm";
import styles from "./Login.module.css";

export default function LoginPage() {
  const loginContext = useAuth();

  if (loginContext.user) {
    return (
      <div className={styles.page}>
        <div className={styles.alreadyLoggedCard}>
          <h1>Olá, {loginContext.user.name}! 👋</h1>
          <p>Você já está logado. Faça logout para acessar outra conta.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Bem-vindo de volta!</h1>
        <p>Faça login para acessar suas informações e serviços personalizados.</p>
        <p>Ainda não tem uma conta? <a href="/register">Registre-se</a></p>
        <UserForm />
      </div>
    </div>
  );
}
