import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { User, userSchema } from '../../schemas/user';
import { useAuth } from '../../contexts/authContext';
import styles from './Form.module.css';

export default function UserForm() {
  const loginContext = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const onSubmit = (data: User) => {
    loginContext.login(data);
    setIsSubmitted(true);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Nome</label>
        <input
          id="name"
          className={[styles.input, errors.name && styles.inputError].filter(Boolean).join(' ')}
          {...register('name')}
        />
        {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          className={[styles.input, errors.password && styles.inputError].filter(Boolean).join(' ')}
          {...register('password')}
        />
        {errors.password && <span className={styles.errorMsg}>{errors.password.message}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        Enviar
      </button>

      {isSubmitted && <p className={styles.successMsg}>Formulário enviado com sucesso!</p>}
    </form>
  );
}
