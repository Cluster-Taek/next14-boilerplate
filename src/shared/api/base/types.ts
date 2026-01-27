export type Body = Record<string, unknown> | Record<string, unknown>[];

export type FetchApi = {
  post: <T = object>(url: string, body?: Body, options?: RequestInit) => Promise<T>;
  get: <T = object>(url: string, params?: Record<string, unknown>, options?: RequestInit) => Promise<T>;
  patch: <T = object>(url: string, body?: Body, options?: RequestInit) => Promise<T>;
  put: <T = object>(url: string, body?: Body, options?: RequestInit) => Promise<T>;
  delete: <T = object>(url: string, options?: RequestInit) => Promise<T>;
};
