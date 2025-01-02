import { ExclamationCircle } from '@medusajs/icons';
import { Checkbox, Table as UiTable } from '@medusajs/ui';
import { useEffect, useMemo, useState } from 'react';

interface ObjectWithId extends Object {
  id: React.Key;
}
interface TableProps<T extends ObjectWithId> {
  columns: {
    key: keyof T;
    label?: string;
    width?: string;
    align?: 'left' | 'right' | 'center';
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }[];
  data: T[];
  pageSize: number;
  count: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  onClickRow?: (item: T) => void;
  selectable?: boolean;
  defaultSelected?: T[];
  onSelectChange?: (selected: T[]) => void;
}

export const Table = <T extends ObjectWithId>({
  columns,
  data,
  pageSize,
  count,
  currentPage,
  setCurrentPage,
  onClickRow,
  selectable,
  defaultSelected,
  onSelectChange,
}: TableProps<T>) => {
  const [selected, setSelected] = useState<T[]>([]);
  const pageCount = useMemo(() => {
    return Math.ceil(count / pageSize);
  }, [data, pageSize]);

  const canNextPage = useMemo(() => {
    return currentPage < pageCount - 1;
  }, [currentPage, pageCount]);
  const canPreviousPage = useMemo(() => {
    return currentPage - 1 >= 0;
  }, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setSelected(defaultSelected ?? []);
  }, [defaultSelected]);

  useEffect(() => {
    onSelectChange?.(selected);
  }, [selected]);

  return (
    <div className="flex h-full flex-col overflow-hidden !border-t-0">
      <UiTable>
        <UiTable.Header>
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
            {columns.map((column, index) => (
              <UiTable.HeaderCell key={index}>{column.label}</UiTable.HeaderCell>
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
                {columns.map((column, index) => (
                  <UiTable.Cell
                    key={`${rowIndex}-${index}`}
                    className={`
                    ${column.align === 'left' && 'text-left'}
                    ${column.align === 'right' && 'text-right'}
                    ${column.align === 'center' && 'text-center'}
                  `}
                    style={{
                      width: column.width ?? 'auto',
                    }}
                  >
                    <>
                      {column.render && column.render(item[column.key] as any, item)}
                      {!column.render && <>{item[column.key] as string}</>}
                    </>
                  </UiTable.Cell>
                ))}
              </UiTable.Row>
            );
          })}
        </UiTable.Body>
      </UiTable>
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
      <UiTable.Pagination
        count={count}
        pageSize={pageSize}
        pageIndex={currentPage}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </div>
  );
};
