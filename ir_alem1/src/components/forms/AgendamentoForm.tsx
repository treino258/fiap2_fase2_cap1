import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Agendamento, agendamentoSchema } from '../../schemas/agentamento';
import { useAgendamento } from '../../contexts/agendamentoContext';
import styles from './Form.module.css';

export default function AgendamentoForm() {
    const agendamentoContext = useAgendamento();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { 
      register, 
      handleSubmit, 
      formState: { errors, isSubmitting },
      reset,
    } = useForm<Agendamento>({
      resolver: zodResolver(agendamentoSchema),
      defaultValues: {
        name: '',
        phone: '',
        date: new Date(),
      },
    });

    const onSubmit = (data: Agendamento) => {
        agendamentoContext.agendar(data);
        setIsSubmitted(true);
        reset();
    }

    return (
        <div className={styles.formCard}>
            <h1>Formulário de Agendamento</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">Nome:</label>
                    <input
                        id="name"
                        className={[styles.input, errors.name && styles.inputError].filter(Boolean).join(' ')}
                        {...register('name')}
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">Telefone:</label>
                    <input
                        id="phone"
                        className={[styles.input, errors.phone && styles.inputError].filter(Boolean).join(' ')}
                        {...register('phone')}
                    />
                    {errors.phone && <span className={styles.errorMsg}>{errors.phone.message}</span>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">Data:</label>
                    <input
                        id="date"
                        type="datetime-local"
                        className={[styles.input, errors.date && styles.inputError].filter(Boolean).join(' ')}
                        {...register('date')}
                    />
                    {errors.date && <span className={styles.errorMsg}>{errors.date.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    Agendar
                </button>

                {isSubmitted && <p className={styles.successMsg}>Agendamento realizado com sucesso!</p>}
            </form>
        </div>
    );
}
