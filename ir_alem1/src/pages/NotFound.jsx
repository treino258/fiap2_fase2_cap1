import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <h1>😵 404</h1>
      <p>Página Não Encontrada</p>
      <p>A página que você tentou acessar não existe.</p>
      <Link to="/" className={styles.backLink}>← Voltar para a Home</Link>
    </div>
  );
}
