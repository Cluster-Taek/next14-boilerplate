'use client';

import { Button } from '@/shared/ui/button';
import { sva } from '@/styled-system/css';
import { useEffect } from 'react';

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
  const errorStyle = ErrorSva();

  useEffect(() => {
    // 에러 로깅 (프로덕션 환경에서는 Sentry 등으로 전송)
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className={errorStyle.wrapper}>
      <div className={errorStyle.content}>
        <h2 className={errorStyle.title}>문제가 발생했습니다</h2>
        <p className={errorStyle.message}>
          {error.message || '알 수 없는 오류가 발생했습니다.'}
        </p>
        {error.digest && (
          <p className={errorStyle.digest}>오류 ID: {error.digest}</p>
        )}
        <Button onClick={reset} className={errorStyle.button}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}

const ErrorSva = sva({
  slots: ['wrapper', 'content', 'title', 'message', 'digest', 'button'],
  base: {
    wrapper: {
      display: 'flex',
      width: 'full',
      height: 'full',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4',
      padding: '8',
      borderRadius: 'md',
      shadow: 'md',
      maxWidth: 'md',
    },
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
      color: 'red.500',
    },
    message: {
      fontSize: 'md',
      color: 'gray.700',
      textAlign: 'center',
    },
    digest: {
      fontSize: 'sm',
      color: 'gray.500',
    },
    button: {
      marginTop: '4',
    },
  },
});
