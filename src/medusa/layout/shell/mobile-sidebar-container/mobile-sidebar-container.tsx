'use client';

import { useSidebar } from '../../../contexts/sidebar-provider';
import { XMark } from '@medusajs/icons';
import { IconButton, clx } from '@medusajs/ui';
import * as Dialog from '@radix-ui/react-dialog';
import { PropsWithChildren } from 'react';

export const MobileSidebarContainer = ({ children }: PropsWithChildren) => {
  const { mobile, toggle } = useSidebar();

  return (
    <Dialog.Root open={mobile} onOpenChange={() => toggle('mobile')}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clx(
            'bg-ui-bg-overlay fixed inset-0',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
          )}
        />
        <Dialog.Content
          className={clx(
            'bg-ui-bg-subtle shadow-elevation-modal fixed inset-y-2 left-2 flex w-full max-w-[304px] flex-col overflow-hidden rounded-lg border-r',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-200'
          )}
        >
          <div className="p-3">
            <Dialog.Close asChild>
              <IconButton size="small" variant="transparent" className="text-ui-fg-subtle">
                <XMark />
              </IconButton>
            </Dialog.Close>
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Dialog.Description className="sr-only">Navigation menu for the dashboard.</Dialog.Description>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
