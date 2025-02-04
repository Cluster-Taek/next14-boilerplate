'use client';

import { ExclamationCircle, TriangleDownMini, TriangleUpMini, TrianglesMini } from '@medusajs/icons';
import { Checkbox, Text, Table as UiTable } from '@medusajs/ui';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';

// eslint-disable-next-line
interface ObjectWithId extends Object {
  id: React.Key;
}
interface TableProps<T extends ObjectWithId> {
  columns?: {
    key: keyof T;
    label?: string;
    width?: string;
    align?: 'left' | 'right' | 'center';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  data: T[];
  pageSize?: number;
  count?: number;
  currentPage?: number;
  setCurrentPage?: (value: number) => void;
  sort?: string;
  setSort?: (value: string) => void;
  onClickRow?: (item: T) => void;
  title?: string;
  actions?: React.ReactNode;
  selectable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  columnsVisibility?: boolean;
  defaultSelected?: T[];
  onSelectChange?: (selected: T[]) => void;
}

export const Table = <T extends ObjectWithId>({
  columns,
  data,
  pageSize = 10,
  count = data.length,
  currentPage = 0,
  title,
  actions,
  setCurrentPage,
  sort,
  setSort,
  onClickRow,
  selectable,
  sortable,
  pagination = true,
  columnsVisibility,
  defaultSelected,
  onSelectChange,
}: TableProps<T>) => {
  const [selected, setSelected] = useState<T[]>([]);

  const noHeader = useMemo(
    () => actions === undefined && title === undefined && columnsVisibility === undefined,
    [actions, title, columnsVisibility]
  );

  const pageCount = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [count, pageSize]);

  const canNextPage = useMemo(() => {
    return currentPage < pageCount - 1;
  }, [currentPage, pageCount]);

  const canPreviousPage = useMemo(() => {
    return currentPage - 1 >= 0;
  }, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage?.(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage?.(currentPage - 1);
    }
  };

  const handleSort = useCallback(
    (column: string) => {
      if (!sortable) return;
      const [sortColumn, sortDirection] = sort?.split(',') ?? [];
      if (sortColumn === column) {
        if (sortDirection === 'DESC') {
          setSort?.(`${column},ASC`);
        } else if (sortDirection === 'ASC') {
          setSort?.('');
        }
      } else {
        setSort?.(`${column},DESC`);
      }
    },
    [sort, setSort, sortable]
  );

  useEffect(() => {
    setSelected(defaultSelected ?? []);
  }, [defaultSelected]);

  useEffect(() => {
    onSelectChange?.(selected);
  }, [selected, onSelectChange]);

  return (
    <Fragment>
      {!noHeader && (
        <div className="flex items-center justify-between w-full px-6 py-4">
          <Text className="text-ui-fg-subtle" size="small">
            {title}
          </Text>
          <div className="flex flex-row justify-end gap-2">{actions}</div>
        </div>
      )}
      <div className={`relative ${pagination ? 'pb-16' : ''}`}>
        <div className="flex h-full flex-col w-full overflow-scroll !border-t-0 relative">
          <UiTable>
            <UiTable.Header className="[&_tr]:bg-ui-bg-base">
              <UiTable.Row>
                {selectable && (
                  <UiTable.HeaderCell
                    style={{
                      width: '40px',
                    }}
                  >
                    <Checkbox
                      disabled={data?.length === 0}
                      checked={selected.length === data.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelected(data);
                        } else {
                          setSelected(defaultSelected ?? []);
                        }
                      }}
                    />
                  </UiTable.HeaderCell>
                )}
                {columns
                  ?.filter((column) => column.label)
                  .map((column, index) => (
                    <UiTable.HeaderCell
                      className="truncate max-w-[200px] cursor-pointer"
                      key={index}
                      onClick={() => handleSort(column.key as string)}
                    >
                      <div className="flex flex-row items-center justify-between gap-4">
                        {column.label}
                        {sortable && (
                          <div className="flex flex-col items-center">
                            {sort?.split(',')[0] === column.key ? (
                              <Fragment key={index}>
                                {sort?.split(',')[1] === 'ASC' && <TriangleUpMini className="text-ui-fg-base" />}
                                {sort?.split(',')[1] === 'DESC' && <TriangleDownMini className="text-ui-fg-base" />}
                              </Fragment>
                            ) : (
                              <TrianglesMini className="text-ui-fg-disabled" />
                            )}
                          </div>
                        )}
                      </div>
                    </UiTable.HeaderCell>
                  ))}
              </UiTable.Row>
            </UiTable.Header>
            <UiTable.Body>
              {data.map((item, index) => {
                const rowIndex = 'id' in item ? (item.id as string) : index;
                return (
                  <UiTable.Row
                    key={rowIndex}
                    onClick={() => onClickRow?.(item)}
                    className={`${onClickRow && 'cursor-pointer'}`}
                  >
                    {selectable && (
                      <UiTable.Cell>
                        <Checkbox
                          checked={selected.some((i) => i.id === item.id)}
                          disabled={defaultSelected?.some((i) => i.id === item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelected([...selected, item]);
                            } else {
                              setSelected(selected.filter((i) => i !== item));
                            }
                          }}
                        />
                      </UiTable.Cell>
                    )}
                    {columns?.map((column, index) => (
                      <UiTable.Cell
                        key={`${rowIndex}-${index}`}
                        className={`
                    ${column.align === 'left' && 'text-left'}
                    ${column.align === 'right' && 'text-right'}
                    ${column.align === 'center' && 'text-center'}
                    truncate max-w-[200px]
                  `}
                        style={{
                          width: column.width ?? 'auto',
                        }}
                      >
                        <Fragment key={index}>
                          {column.render && column.render(item[column.key] as unknown, item)}
                          {!column.render && ((item[column.key] as string) ?? '-')}
                        </Fragment>
                      </UiTable.Cell>
                    ))}
                  </UiTable.Row>
                );
              })}
            </UiTable.Body>
          </UiTable>
        </div>
        {data.length === 0 && (
          <div className="flex h-[200px] w-full flex-col items-center justify-center gap-y-4">
            <div className="flex flex-col items-center gap-y-3">
              <ExclamationCircle />
              <div className="flex flex-col items-center gap-y-1">
                <p className="font-sans font-medium txt-compact-small">No records</p>
                <p className="font-sans font-normal txt-small text-ui-fg-muted">There are no records to show</p>
              </div>
            </div>
          </div>
        )}
        {pagination && (
          <UiTable.Pagination
            className="absolute bottom-0 left-0 right-0 w-full"
            count={count}
            pageSize={pageSize}
            pageIndex={currentPage}
            pageCount={pageCount}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            previousPage={previousPage}
            nextPage={nextPage}
          />
        )}
      </div>
    </Fragment>
  );
};
