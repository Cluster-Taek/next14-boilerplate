'use client';

import { Divider } from '../../components/divider';
import { Skeleton } from '../../components/skeleton';
import { NavItem } from '../nav-item';
import { IRoutes, MENU_CONSTANTS } from '@/constants/menu-constants';
import { ChevronDownMini, EllipsisHorizontal, MinusMini, OpenRectArrowOut } from '@medusajs/icons';
import { Avatar, DropdownMenu, Text, clx } from '@medusajs/ui';
import * as Collapsible from '@radix-ui/react-collapsible';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const MainSidebar = () => {
  return (
    <aside className="flex flex-col justify-between flex-1 overflow-y-auto">
      <div className="flex flex-col flex-1">
        <div className="sticky top-0 bg-ui-bg-subtle">
          <Header />
          <div className="px-3">
            <Divider variant="dashed" />
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col flex-1 py-3">
            {MENU_CONSTANTS.map((route) => (
              <RouteSection key={route.title} {...route} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <DropdownMenu.Item onClick={handleLogout}>
      <div className="flex items-center gap-x-2">
        <OpenRectArrowOut className="text-ui-fg-subtle" />
        <span>Logout</span>
      </div>
    </DropdownMenu.Item>
  );
};

const Header = () => {
  const name = process.env.NEXT_PUBLIC_STORE_NAME ?? 'Medusa';
  const fallback = name.slice(0, 1).toUpperCase();

  return (
    <div className="w-full p-3">
      <DropdownMenu>
        <DropdownMenu.Trigger
          className={clx(
            'bg-ui-bg-subtle transition-fg grid w-full grid-cols-[24px_1fr_15px] items-center gap-x-3 rounded-md p-0.5 pr-2 outline-none',
            'hover:bg-ui-bg-subtle-hover',
            'data-[state=open]:bg-ui-bg-subtle-hover',
            'focus-visible:shadow-borders-focus'
          )}
        >
          {fallback ? (
            <Avatar variant="squared" size="xsmall" className="bg-white" color="text-ui-fg-base" fallback={fallback} />
          ) : (
            <Skeleton className="w-6 h-6 rounded-md" />
          )}
          <div className="block overflow-hidden text-left">
            {name ? (
              <Text size="small" weight="plus" leading="compact" className="truncate">
                {name}
              </Text>
            ) : (
              <Skeleton className="h-[9px] w-[120px]" />
            )}
          </div>
          <EllipsisHorizontal className="text-ui-fg-muted" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0">
          <div className="flex items-center px-2 py-1 gap-x-3">
            <Avatar variant="squared" size="small" fallback={fallback} />
            <div className="flex flex-col overflow-hidden">
              <Text size="small" weight="plus" leading="compact" className="truncate">
                {name}
              </Text>
              <Text size="xsmall" leading="compact" className="text-ui-fg-subtle">
                {name}
              </Text>
            </div>
          </div>
          <DropdownMenu.Separator />
          <Logout />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

const RouteSection = ({ title, navItems }: IRoutes) => {
  return (
    <div>
      <div className="flex flex-col py-[5px] gap-y-1">
        <Collapsible.Root defaultOpen>
          <div className="px-4">
            <Collapsible.Trigger asChild className="group/trigger">
              <button className="flex items-center justify-between w-full px-2 text-ui-fg-subtle">
                <Text size="xsmall" weight="plus" leading="compact">
                  {title}
                </Text>
                <div className="text-ui-fg-muted">
                  <ChevronDownMini className="group-data-[state=open]/trigger:hidden" />
                  <MinusMini className="group-data-[state=closed]/trigger:hidden" />
                </div>
              </button>
            </Collapsible.Trigger>
          </div>
          <Collapsible.Content>
            <nav className="flex flex-col py-[5px] gap-y-1">
              {navItems.map((route) => {
                return <NavItem key={route.to} {...route} />;
              })}
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
};
