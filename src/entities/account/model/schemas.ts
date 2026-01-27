import { z } from 'zod';
import { emailSchema, passwordSchema } from '@/shared/lib/validation';

/**
 * 로그인 폼 스키마
 */
export const loginFormSchema = z.object({
  login: emailSchema,
  password: passwordSchema,
});

/**
 * 로그인 폼 타입
 */
export type LoginFormValues = z.infer<typeof loginFormSchema>;

/**
 * 로그인 응답 스키마
 */
export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

/**
 * 로그인 응답 타입
 */
export type LoginResponse = z.infer<typeof loginResponseSchema>;
