'use client';

import { useSidebar } from '../../../contexts/sidebar-provider';
import { SidebarLeft } from '@medusajs/icons';
import { IconButton } from '@medusajs/ui';

export const ToggleSidebar = () => {
  const { toggle } = useSidebar();

  return (
    <div>
      <IconButton className="hidden lg:flex" variant="transparent" onClick={() => toggle('desktop')} size="small">
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
      <IconButton className="hidden max-lg:flex" variant="transparent" onClick={() => toggle('mobile')} size="small">
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
    </div>
  );
};
