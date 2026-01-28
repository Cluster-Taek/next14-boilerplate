import { z } from 'zod';
import { nameSchema } from '@/shared/lib/validation';

/**
 * 사용자 엔티티 스키마
 */
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type User = z.infer<typeof userSchema>;

/**
 * 사용자 목록 조회 파라미터 스키마
 */
export const usersParamsSchema = z.object({
  _page: z.number(),
  _per_page: z.number(),
});

export type UsersParams = z.infer<typeof usersParamsSchema>;

/**
 * 사용자 생성 폼 스키마
 */
export const userCreateFormSchema = z.object({
  name: nameSchema,
});

export type UserCreateFormValues = z.infer<typeof userCreateFormSchema>;
