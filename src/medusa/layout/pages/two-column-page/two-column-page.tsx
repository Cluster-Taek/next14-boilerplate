import { PageProps } from '../types';
import { Children } from 'react';

export const TwoColumnPage = <TData,>({ children }: PageProps<TData>) => {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length !== 2) {
    throw new Error('TwoColumnPage expects exactly two children');
  }

  const [sidebar, main] = childrenArray;

  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 xl:grid xl:grid-cols-[400px_minmax(0,_1fr)]">
        <div className="flex flex-col w-full min-w-0 gap-y-3">{sidebar}</div>
        <div className="flex flex-col w-full gap-y-3 xl:mt-0">{main}</div>
      </div>
    </div>
  );
};
