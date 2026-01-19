import { z } from 'zod';
import { nameSchema } from '../common/field-schemas';

/**
 * 사용자 생성 폼 스키마
 */
export const userCreateFormSchema = z.object({
  name: nameSchema,
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
