'use client';

import { useEffect } from 'react';
import { Button } from '@/shared/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * 페이지 레벨 Error Boundary
 *
 * 특정 페이지에서 발생한 에러를 처리합니다.
 * layout.tsx는 영향받지 않으므로 네비게이션은 계속 작동합니다.
 */
export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (프로덕션 환경에서는 Sentry 등으로 전송)
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex w-full h-full items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 p-8 rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-bold text-red-500">문제가 발생했습니다</h2>
        <p className="text-base text-gray-700 text-center">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
        {error.digest && <p className="text-sm text-gray-500">오류 ID: {error.digest}</p>}
        <Button onClick={reset} className="mt-4">
          다시 시도
        </Button>
      </div>
    </div>
  );
}
