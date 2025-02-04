'use client';

import { Text, clx } from '@medusajs/ui';
import * as Collapsible from '@radix-ui/react-collapsible';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useState } from 'react';

type ItemType = 'core' | 'extension' | 'setting';

type NestedItemProps = {
  label: string;
  to: string;
};

export type INavItem = {
  icon?: ReactNode;
  label: string;
  to: string;
  items?: NestedItemProps[];
  type?: ItemType;
  from?: string;
};

const BASE_NAV_LINK_CLASSES =
  'text-ui-fg-subtle transition-fg hover:bg-ui-bg-subtle-hover flex items-center gap-x-2 rounded-md py-0.5 pl-0.5 pr-2 outline-none [&>svg]:text-ui-fg-subtle focus-visible:shadow-borders-focus';
const ACTIVE_NAV_LINK_CLASSES = 'bg-ui-bg-base shadow-elevation-card-rest text-ui-fg-base hover:bg-ui-bg-base';
const NESTED_NAV_LINK_CLASSES = 'pl-[34px] pr-2 py-1 w-full text-ui-fg-muted';
const SETTING_NAV_LINK_CLASSES = 'pl-2 py-1';

const getIsOpen = (to: string, items: NestedItemProps[] | undefined, pathname: string) => {
  return [to, ...(items?.map((i) => i.to) ?? [])].some((p) => pathname.startsWith(p));
};

export const NavItem = ({ icon, label, to, items, type = 'core' }: INavItem) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(getIsOpen(to, items, pathname));

  useEffect(() => {
    setOpen(getIsOpen(to, items, pathname));
  }, [pathname, to, items]);

  const navLinkClassNames = useCallback(
    ({
      isActive,
      isNested = false,
      isSetting = false,
    }: {
      isActive: boolean;
      isNested?: boolean;
      isSetting?: boolean;
    }) =>
      clx(BASE_NAV_LINK_CLASSES, {
        [NESTED_NAV_LINK_CLASSES]: isNested,
        [ACTIVE_NAV_LINK_CLASSES]: isActive,
        [SETTING_NAV_LINK_CLASSES]: isSetting,
      }),
    []
  );

  const isSetting = type === 'setting';

  return (
    <div className="px-3">
      <Link
        href={to}
        className={clx(
          navLinkClassNames({
            isActive: pathname === to,
            isSetting,
          }),
          {
            'max-lg:hidden': !!items?.length,
          },
          'w-full'
        )}
      >
        {type !== 'setting' && (
          <div className="flex items-center justify-center size-6">
            <Icon icon={icon} type={type} />
          </div>
        )}
        <Text size="small" weight="plus" leading="compact">
          {label}
        </Text>
      </Link>
      {items && items.length > 0 && (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger
            className={clx(
              'text-ui-fg-subtle hover:text-ui-fg-base transition-fg hover:bg-ui-bg-subtle-hover flex w-full items-center gap-x-2 rounded-md py-0.5 pl-0.5 pr-2 outline-none lg:hidden',
              { 'pl-2': isSetting }
            )}
          >
            <div className="flex items-center justify-center size-6">
              <Icon icon={icon} type={type} />
            </div>
            <Text size="small" weight="plus" leading="compact">
              {label}
            </Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="flex flex-col gap-y-0.5 pb-2 pt-0.5">
              <ul className="flex flex-col gap-y-0.5">
                <li className="flex items-center w-full gap-x-1 lg:hidden">
                  <Link
                    href={to}
                    className={clx(
                      navLinkClassNames({
                        isActive: pathname.startsWith(to),
                        isNested: true,
                      }),
                      {
                        'max-lg:hidden': !!items?.length,
                      },
                      'w-full'
                    )}
                  >
                    <Text size="small" weight="plus" leading="compact">
                      {label}
                    </Text>
                  </Link>
                </li>
                {items.map((item) => {
                  return (
                    <li key={item.to} className="flex items-center h-7">
                      <Link
                        href={`${to}${item.to}`}
                        className={clx(
                          navLinkClassNames({
                            isActive: pathname.startsWith(`${to}${item.to}`),
                            isNested: true,
                          }),
                          {
                            'max-lg:hidden': !!items?.length,
                          },
                          'w-full'
                        )}
                      >
                        <Text size="small" weight="plus" leading="compact">
                          {item.label}
                        </Text>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  );
};

const Icon = ({ icon, type }: { icon?: ReactNode; type: ItemType }) => {
  if (!icon) {
    return null;
  }

  return type === 'extension' ? (
    <div className="shadow-borders-base bg-ui-bg-base flex h-5 w-5 items-center justify-center rounded-[4px]">
      <div className="h-[15px] w-[15px] overflow-hidden rounded-sm">{icon}</div>
    </div>
  ) : (
    icon
  );
};
