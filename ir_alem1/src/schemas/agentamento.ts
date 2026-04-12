import { z } from 'zod';

export const agendamentoSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  date: z.preprocess((arg: any) => {
    if (typeof arg === 'string') {
      const [datePart, timePart] = arg.split('T');
      if (!timePart) return new Date(arg);
      const [y, m, d] = datePart.split('-').map(Number);
      const [h, min] = timePart.split(':').map(Number);
      return new Date(y, m - 1, d, h, min);
    }
    return arg;
  }, z.date().refine(d => !Number.isNaN(d.getTime()), { message: 'Data/hora inválida' })),
  obs: z.string().optional(),
}
);

export type Agendamento = z.infer<typeof agendamentoSchema>;