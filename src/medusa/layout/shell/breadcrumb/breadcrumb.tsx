'use client';

import { TriangleRightMini } from '@medusajs/icons';
import { clx } from '@medusajs/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const matches = pathname
    ?.split('/')
    .slice(1)
    .map((_, index, array) => {
      return {
        label: array[index],
        pathname: '/' + array.slice(0, index + 1).join('/'),
      };
    });

  return (
    <ol className={clx('text-ui-fg-muted txt-compact-small-plus flex select-none items-center')}>
      {matches?.map((match, index) => {
        const isLast = index === matches.length - 1;
        const isSingle = matches.length === 1;

        return (
          <li key={index} className={clx('flex items-center')}>
            {!isLast ? (
              <Link className="transition-fg hover:text-ui-fg-subtle" href={match.pathname}>
                {match.label}
              </Link>
            ) : (
              <div>
                {!isSingle && <span className="block lg:hidden">...</span>}
                <span
                  key={index}
                  className={clx({
                    'hidden lg:block': !isSingle,
                  })}
                >
                  {match.label}
                </span>
              </div>
            )}
            {!isLast && (
              <span className="mx-2">
                <TriangleRightMini />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
};
