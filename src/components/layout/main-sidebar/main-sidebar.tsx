'use client';

import { INavItem, NavItem } from '../nav-item';
import { Divider } from '@/components/common/divider';
import { Skeleton } from '@/components/common/skeleton';
import {
  BellAlert,
  BuildingStorefront,
  Buildings,
  ChevronDownMini,
  CogSixTooth,
  CurrencyDollar,
  EllipsisHorizontal,
  Lifebuoy,
  MinusMini,
  OpenRectArrowOut,
  Users,
} from '@medusajs/icons';
import { Avatar, DropdownMenu, Text, clx } from '@medusajs/ui';
import * as Collapsible from '@radix-ui/react-collapsible';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

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
            {/* <NotificationRouteSection /> */}
            <InfluencerRouteSection />
            <EventRouteSection />
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

// const useNotificationRoutes = (): Omit<INavItem, 'pathname'>[] => {
//   return [
//     {
//       icon: <BellAlert />,
//       label: '알림',
//       to: '/notifications',
//     },
//   ];
// };

const useInfluencerRoutes = (): Omit<INavItem, 'pathname'>[] => {
  return [
    {
      icon: <Buildings />,
      label: '인플루언서',
      to: '/influencers',
    },
    {
      icon: <Users />,
      label: '셀러브리티',
      to: '/celebrities',
    },
  ];
};

const useEventRoutes = (): Omit<INavItem, 'pathname'>[] => {
  return [
    {
      icon: <Lifebuoy />,
      label: '이벤트 관리',
      to: '/events',
    },
    {
      icon: <CurrencyDollar />,
      label: '정산 관리',
      to: '/settlements',
    },
  ];
};

// const CoreRouteSection = () => {
//   const coreRoutes = useCoreRoutes();

//   return (
//     <nav className="flex flex-col py-3 gap-y-1">
//       {coreRoutes.map((route) => {
//         return <NavItem key={route.to} {...route} />;
//       })}
//     </nav>
//   );
// };

// const NotificationRouteSection = () => {
//   const notificationRoutes = useNotificationRoutes();

//   return (
//     <div>
//       <div className="flex flex-col py-3 gap-y-1">
//         <Collapsible.Root defaultOpen>
//           <div className="px-4">
//             <Collapsible.Trigger asChild className="group/trigger">
//               <button className="flex items-center justify-between w-full px-2 text-ui-fg-subtle">
//                 <Text size="xsmall" weight="plus" leading="compact">
//                   알림
//                 </Text>
//                 <div className="text-ui-fg-muted">
//                   <ChevronDownMini className="group-data-[state=open]/trigger:hidden" />
//                   <MinusMini className="group-data-[state=closed]/trigger:hidden" />
//                 </div>
//               </button>
//             </Collapsible.Trigger>
//           </div>
//           <Collapsible.Content>
//             <nav className="flex flex-col py-3 gap-y-1">
//               {notificationRoutes.map((route) => {
//                 return <NavItem key={route.to} {...route} />;
//               })}
//             </nav>
//           </Collapsible.Content>
//         </Collapsible.Root>
//       </div>
//     </div>
//   );
// };

const InfluencerRouteSection = () => {
  const influencerRoutes = useInfluencerRoutes();

  return (
    <div>
      <div className="flex flex-col py-[5px] gap-y-1">
        <Collapsible.Root defaultOpen>
          <div className="px-4">
            <Collapsible.Trigger asChild className="group/trigger">
              <button className="flex items-center justify-between w-full px-2 text-ui-fg-subtle">
                <Text size="xsmall" weight="plus" leading="compact">
                  인플루언서
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
              {influencerRoutes.map((route) => {
                return <NavItem key={route.to} {...route} />;
              })}
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
};

const EventRouteSection = () => {
  const eventRoutes = useEventRoutes();

  return (
    <div>
      <div className="flex flex-col py-3 gap-y-1">
        <Collapsible.Root defaultOpen>
          <div className="px-4">
            <Collapsible.Trigger asChild className="group/trigger">
              <button className="flex items-center justify-between w-full px-2 text-ui-fg-subtle">
                <Text size="xsmall" weight="plus" leading="compact">
                  이벤트
                </Text>
                <div className="text-ui-fg-muted">
                  <ChevronDownMini className="group-data-[state=open]/trigger:hidden" />
                  <MinusMini className="group-data-[state=closed]/trigger:hidden" />
                </div>
              </button>
            </Collapsible.Trigger>
          </div>
          <Collapsible.Content>
            <nav className="flex flex-col py-3 gap-y-1">
              {eventRoutes.map((route) => {
                return <NavItem key={route.to} {...route} />;
              })}
            </nav>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
      <div className="px-3">
        <Divider variant="dashed" />
      </div>
    </div>
  );
};

const UtilitySection = () => {
  return (
    <div className="flex flex-col gap-y-0.5 py-3">
      <NavItem label="Settings" to="/settings" from={location.pathname} icon={<CogSixTooth />} />
    </div>
  );
};
