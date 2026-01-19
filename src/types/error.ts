/**
 * 기본 에러 인터페이스
 */
export interface IError {
  status: number;
  message: string;
}

/**
 * API 에러 인터페이스
 * REST API 호출 시 발생하는 에러
 */
export interface IApiError extends IError {
  code?: string;
  details?: Record<string, string[]>;
  timestamp?: string;
}

/**
 * 에러 응답 타입 가드
 */
export function isApiError(error: unknown): error is IApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
}
