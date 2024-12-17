import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface UpdateQueryStringOption {
  replace?: boolean;
}
export const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (name: string, value: string, options?: UpdateQueryStringOption) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      if (options?.replace) {
        router.replace(pathname + "?" + params.toString());
      } else {
        router.push(pathname + "?" + params.toString());
      }
    },
    [searchParams, router, pathname]
  );

  return { updateQueryString } as const;
};
