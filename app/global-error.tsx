'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 전역 Error Boundary
 *
 * 루트 layout.tsx에서 발생한 에러를 처리합니다.
 * 전체 애플리케이션이 크래시되는 것을 방지합니다.
 *
 * 주의: 반드시 <html>, <body> 태그를 포함해야 합니다.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 전역 에러 로깅 (프로덕션 환경에서는 Sentry 등으로 전송)
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div
          style={{
            display: 'flex',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem',
            padding: '2rem',
          }}
        >
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
            심각한 오류가 발생했습니다
          </h1>
          <p style={{ fontSize: '1rem', color: '#374151' }}>
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </p>
          {error.digest && (
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              오류 ID: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
