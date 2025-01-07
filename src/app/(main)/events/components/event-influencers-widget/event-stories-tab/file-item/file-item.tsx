'use client';

import { Divider } from '@/components/common/divider';
import { IFile } from '@/types/common';
import { ArrowDownTray, Trash } from '@medusajs/icons';
import { Text } from '@medusajs/ui';
import * as ContextMenu from '@radix-ui/react-context-menu';
import axios from 'axios';
import { saveAs } from 'file-saver';
import Image from 'next/image';
import { useCallback } from 'react';

interface IFileItemProps {
  item: IFile;
  selected?: boolean;
  onClick?: () => void;
}

export const FileItem = ({ item, selected, onClick }: IFileItemProps) => {
  const handleSaveImage = useCallback(async () => {
    const response = await axios.get(item.url, { responseType: 'blob' });
    saveAs(response.data, item.title);
  }, [item.url, item.title]);

  const handleDeleteImage = () => {
    // Delete image logic
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          className={`w-full aspect-[0.7] bg-ui-bg-subtle rounded-lg p-4 flex flex-col gap-2 border-2 ${
            selected ? 'border-ui-fg-primary bg-ui-bg-subtle-pressed' : 'border-transparent'
          }`}
          style={{ cursor: onClick ? 'pointer' : 'default' }}
          onClick={onClick}
        >
          <Text size="small" className="truncate text-ui-fg-subtle">
            {item.title}
          </Text>
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image alt={item.title} src={item.thumbnail ?? item.url} layout="fill" objectFit="cover" />
          </div>
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Content className="rounded-lg bg-ui-bg-component shadow-elevation-modal min-w-[224px] p-1 relative z-10">
        <ContextMenu.Item
          className="flex items-center gap-2 p-2 rounded-t-lg cursor-pointer hover:bg-ui-bg-subtle"
          onClick={handleSaveImage}
        >
          <ArrowDownTray />
          이미지 저장
        </ContextMenu.Item>
        <Divider />
        <ContextMenu.Item
          className="flex items-center gap-2 p-2 rounded-b-lg cursor-pointer hover:bg-ui-bg-subtle"
          onClick={handleDeleteImage}
        >
          <Trash />
          이미지 삭제
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
