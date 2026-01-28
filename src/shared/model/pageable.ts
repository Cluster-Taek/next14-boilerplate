import { z } from 'zod';

// Zod 스키마 (파싱/검증용)
export const pageableSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    first: z.number(),
    prev: z.number().nullable(),
    next: z.number().nullable(),
    last: z.number(),
    pages: z.number(),
    items: z.number(),
    data: z.array(itemSchema),
  });

// TypeScript 타입 (제네릭으로 사용)
export type Pageable<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};
