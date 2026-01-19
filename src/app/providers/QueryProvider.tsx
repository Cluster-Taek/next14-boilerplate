'use client';

import { fetchApi } from '@/shared/api';
import { getClearObject } from '@/shared/lib/utils';
import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const fetcher = async (url: string, params?: Record<string, unknown>) => {
    return fetchApi.get(url, params);
  };

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            queryFn: ({ queryKey }) =>
              fetcher(queryKey[0] as string, queryKey[1] ? getClearObject(queryKey[1]) : undefined),
            placeholderData: keepPreviousData,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};
