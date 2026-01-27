import { z } from 'zod';
import { nameSchema } from '@/shared/lib/validation';

/**
 * 사용자 생성 폼 스키마
 */
export const userCreateFormSchema = z.object({
  name: nameSchema,
});

/**
 * 사용자 생성 폼 타입
 */
export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
