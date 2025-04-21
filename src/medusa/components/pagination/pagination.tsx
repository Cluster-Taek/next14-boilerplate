import { Minus } from '@medusajs/icons';
import { Button } from '@medusajs/ui';
import React from 'react';

interface PaginationProps {
  className?: string;
  count: number;
  pageSize: number;
  pageCount: number;
  pageIndex: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  translations?: {
    of?: string;
    results?: string;
    pages?: string;
    prev?: string;
    next?: string;
    first?: string;
    last?: string;
  };
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      count,
      pageSize,
      pageCount,
      pageIndex,
      canPreviousPage,
      canNextPage,
      nextPage,
      previousPage,
      goToFirstPage,
      goToLastPage,
      translations = {
        of: 'of',
        results: 'results',
        pages: 'pages',
        prev: 'Prev',
        next: 'Next',
        first: 'First',
        last: 'Last',
      },
      ...props
    },
    ref
  ) => {
    const { from, to } = React.useMemo(() => {
      const from = count === 0 ? 0 : pageIndex * pageSize + 1;
      const to = Math.min(count, (pageIndex + 1) * pageSize);
      return { from, to };
    }, [count, pageIndex, pageSize]);

    return (
      <div
        ref={ref}
        className={`text-ui-fg-subtle txt-compact-small-plus flex w-full items-center justify-between px-3 py-4 ${className}`}
        {...props}
      >
        <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
          <p>{from}</p>
          <Minus className="text-ui-fg-muted" />
          <p>{`${to} ${translations.of} ${count} ${translations.results}`}</p>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="inline-flex items-center gap-x-1 px-3 py-[5px]">
            <p>
              {pageIndex + 1} {translations.of} {Math.max(pageCount, 1)} {translations.pages}
            </p>
          </div>
          <Button type="button" variant="transparent" onClick={goToFirstPage} disabled={!canPreviousPage}>
            {translations.first}
          </Button>
          <Button type="button" variant="transparent" onClick={previousPage} disabled={!canPreviousPage}>
            {translations.prev}
          </Button>
          <Button type="button" variant="transparent" onClick={nextPage} disabled={!canNextPage}>
            {translations.next}
          </Button>
          <Button type="button" variant="transparent" onClick={goToLastPage} disabled={!canNextPage}>
            {translations.last}
          </Button>
        </div>
      </div>
    );
  }
);

Pagination.displayName = 'Pagination';
