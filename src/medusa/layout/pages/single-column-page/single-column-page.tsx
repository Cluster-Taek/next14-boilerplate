import { PageProps } from '../types';

export const SingleColumnPage = <TData,>({ children }: PageProps<TData>) => {
  return <div className="flex flex-col gap-y-3">{children}</div>;
};
