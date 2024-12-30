'use client';

import { INavItem, NavItem } from '../nav-item';
import { Divider } from '@/components/common/divider';
import { Skeleton } from '@/components/common/skeleton';
import {
  BuildingStorefront,
  Buildings,
  CogSixTooth,
  CurrencyDollar,
  EllipsisHorizontal,
  OpenRectArrowOut,
  ReceiptPercent,
  ShoppingCart,
  Tag,
  Users,
} from '@medusajs/icons';
import { Avatar, DropdownMenu, Text, clx } from '@medusajs/ui';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const MainLayout = () => {
  return (
    <div className="hidden h-screen w-[220px] border-r lg:flex">
      <MainSidebar />
    </div>
  );
};

const MainSidebar = () => {
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
          <div className="flex flex-col flex-1">
            <CoreRouteSection />
          </div>
          <UtilitySection />
        </div>
      </div>
    </aside>
  );
};

const Logout = () => {
  const handleLogout = async () => {
    await signOut();
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
            <Avatar variant="squared" size="xsmall" fallback={fallback} />
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
                Store
              </Text>
            </div>
          </div>
          <DropdownMenu.Separator />
          <DropdownMenu.Item className="gap-x-2" asChild>
            <Link href="/settings/store">
              <BuildingStorefront className="text-ui-fg-subtle" />
              Store settings
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <Logout />
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  );
};

const useCoreRoutes = (): Omit<INavItem, 'pathname'>[] => {
  return [
    {
      icon: <Users />,
      label: 'Users',
      to: '/users',
    },
    {
      icon: <ShoppingCart />,
      label: 'Orders',
      to: '/orders',
      items: [
        // TODO: Enable when domin is introduced
        // {
        //   label: t("draftOrders.domain"),
        //   to: "/draft-orders",
        // },
      ],
    },
    {
      icon: <Tag />,
      label: 'Products',
      to: '/products',
      items: [
        {
          label: 'Collections',
          to: '/collections',
        },
        {
          label: 'Categories',
          to: '/categories',
        },
        // TODO: Enable when domin is introduced
        // {
        //   label: t("giftCards.domain"),
        //   to: "/gift-cards",
        // },
      ],
    },
    {
      icon: <ReceiptPercent />,
      label: 'Promotions',
      to: '/promotions',
      items: [
        {
          label: 'Campaigns',
          to: '/campaigns',
        },
      ],
    },
    {
      icon: <CurrencyDollar />,
      label: 'Price lists',
      to: '/price-lists',
    },
  ];
};

const CoreRouteSection = () => {
  const coreRoutes = useCoreRoutes();

  return (
    <nav className="flex flex-col py-3 gap-y-1">
      {coreRoutes.map((route) => {
        return <NavItem key={route.to} {...route} />;
      })}
    </nav>
  );
};

const UtilitySection = () => {
  return (
    <div className="flex flex-col gap-y-0.5 py-3">
      <NavItem label="Settings" to="/settings" from={location.pathname} icon={<CogSixTooth />} />
    </div>
  );
};
