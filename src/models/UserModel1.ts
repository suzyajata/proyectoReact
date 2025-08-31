import z from 'zod';

export const schemaUser1 = z.object({
  username: z.string().min(3, 'El nombre es obligatorio'),
  password: z.string().min(3, 'El nombre es obligatorio'),
  confirmPassword: z.string().min(3, 'El nombre es obligatorio'),
});

export type UserFormValues1 = z.infer<typeof schemaUser1>;