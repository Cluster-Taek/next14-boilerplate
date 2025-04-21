'use client';

import { ExclamationCircle } from '@medusajs/icons';
import { Text } from '@medusajs/ui';
import { useEffect } from 'react';

interface IErrorProps {
  error: Error & { digest?: string };
}

const Error = ({ error }: IErrorProps) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex size-full min-h-[calc(100vh-57px-24px)] items-center justify-center">
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col items-center text-ui-fg-subtle gap-y-3">
          <ExclamationCircle />
          <div className="flex flex-col items-center justify-center gap-y-1">
            <Text size="small" leading="compact" weight="plus">
              {error.name ?? 'An error occurred'}
            </Text>
            <Text size="small" className="text-center text-ui-fg-muted text-balance">
              {error.message}
            </Text>
          </div>
          {/* <Button
            size="small"
            variant="secondary"
            onClick={() => {
              window.location.reload();
            }}
          >
            <ArrowPathMini className="mr-2" />
            Reload
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Error;
