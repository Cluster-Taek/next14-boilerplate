'use client';

import { useAlert } from './alert-provider';
import { fetchApi } from '@/lib/base';
import { getClearObject } from '@/utils/utils';
import { QueryClient, QueryClientProvider, keepPreviousData } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { alert } = useAlert();

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
            throwOnError: true,
            queryFn: ({ queryKey }) =>
              fetcher(queryKey[0] as string, queryKey[1] ? getClearObject(queryKey[1]) : undefined),
            placeholderData: keepPreviousData,
          },
          mutations: {
            onError: (error) => {
              const axiosError = error as AxiosError<{
                status: number;
                message: string;
              }>;

              alert({
                variant: 'error',
                children: axiosError.response?.data.message ?? axiosError.message,
              });
            },
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
