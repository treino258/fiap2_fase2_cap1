import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'O nome deve conter pelo menos 2 caracteres'),  
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
});

export type User = z.infer<typeof userSchema>;
export const publicUserSchema = userSchema.omit({ password: true });
export type PublicUser = z.infer<typeof publicUserSchema>;