import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import styles from "./NavBar.module.css";

export default function NavigationBar() {
    const auth = useAuth();

    return (
        <nav className={styles.nav}>
            <span className={styles.brand}>❤️ CardioAI</span>

            <div className={styles.navLinks}>
                <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>
                    Home
                </NavLink>
                <NavLink to="/listagemPacientes" className={({ isActive }) => isActive ? styles.active : undefined}>
                    Listagem de Pacientes
                </NavLink>
                <NavLink to="/agendamento" className={({ isActive }) => isActive ? styles.active : undefined}>
                    Agendamento
                </NavLink>
            </div>

            <div className={styles.authSection}>
                {auth.user ? (
                    <div className={styles.authLinks}>
                        <span className={styles.greeting}>Olá, {auth.user.name}!</span>
                        <button className={styles.logoutButton} onClick={auth.logout}>Logout</button>
                    </div>
                ) : (
                    <div className={styles.authLinks}>
                        <NavLink to="/register">Registrar</NavLink>
                        <span className={styles.notLoggedText}>|</span>
                        <NavLink to="/login">Login</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
}
