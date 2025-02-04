import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface UpdateSearchParamsOption {
  replace?: boolean;
}

export const useSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useNextSearchParams();

  const setSearchParams = useCallback(
    (params: Record<string, string | string[]>, options: UpdateSearchParamsOption) => {
      const search = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(params)) {
        search.set(key, Array.isArray(value) ? value.join(',') : value);
      }

      for (const key of Array.from(search.keys())) {
        if (search.get(key) === 'undefined' || search.get(key) === null || search.get(key) === '') {
          search.delete(key);
        }
      }

      const url = `${pathname}?${search.toString()}`;

      if (options.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [router, pathname, searchParams]
  );

  const resetSearchParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return { searchParams: Object.fromEntries(searchParams), setSearchParams, resetSearchParams } as const;
};
