import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import styles from './ProtectedRoute.module.css';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export function AccessDenied({ children }: ProtectedRouteProps) {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className={styles.accessDenied}>
                <h1>Acesso Negado</h1>
                <p>Você precisa estar logado para acessar esta página.</p>
                <Link to="/login" className={styles.loginLink}>Ir para o Login</Link>
            </div>
        );
    }

    return <>{children}</>;
}
