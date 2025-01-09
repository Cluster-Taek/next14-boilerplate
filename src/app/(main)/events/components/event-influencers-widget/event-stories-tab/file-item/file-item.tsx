'use client';

import { Divider } from '@/components/common/divider';
import { useBulkDeleteEventStoriesMutation } from '@/lib/stories';
import { IFile } from '@/types/common';
import { ArrowDownTray, Trash } from '@medusajs/icons';
import { Text, usePrompt } from '@medusajs/ui';
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
  const dialog = usePrompt();
  const { mutate: deleteEventStories } = useBulkDeleteEventStoriesMutation();

  const handleSaveImage = useCallback(async () => {
    const response = await axios.get(item.url, { responseType: 'blob' });
    saveAs(response.data, item.title);
  }, [item.url, item.title]);

  const handleDeleteFiles = useCallback(async () => {
    const confirmedDelete = await dialog({
      title: '스토리 삭제',
      description: '해당 스토리를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (confirmedDelete) {
      deleteEventStories([item.id]);
    }
  }, [dialog, deleteEventStories, item.id]);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          data-id={item.id}
          className={`w-full aspect-[0.7] bg-ui-bg-subtle rounded-lg p-4 flex flex-col gap-2 border-2 ${
            selected ? 'border-ui-fg-primary bg-ui-bg-subtle-pressed' : 'border-transparent'
          } file-item`}
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
          onClick={handleDeleteFiles}
        >
          <Trash />
          이미지 삭제
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};
