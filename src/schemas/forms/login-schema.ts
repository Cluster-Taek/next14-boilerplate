import { z } from 'zod';
import { emailSchema, passwordSchema } from '../common/field-schemas';

/**
 * 로그인 폼 스키마
 */
export const loginFormSchema = z.object({
  login: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
