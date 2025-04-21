'use client';

import { useSidebar } from '../../../contexts/sidebar-provider';
import { clx } from '@medusajs/ui';
import { PropsWithChildren } from 'react';

export const DesktopSidebarContainer = ({ children }: PropsWithChildren) => {
  const { desktop } = useSidebar();

  return (
    <div
      className={clx('hidden h-screen w-[220px] border-r', {
        'lg:flex': desktop,
      })}
    >
      {children}
    </div>
  );
};
