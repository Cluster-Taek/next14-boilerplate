import { FileItem } from '../file-item';
import { IFile } from '@/types/common';
import { ArrowDownTray, Trash, TriangleDownMini, TriangleRightMini } from '@medusajs/icons';
import { Button, Text } from '@medusajs/ui';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';

interface IFileFinderProps {
  files: IFile[];
}

export const FileFinder = ({ files }: IFileFinderProps) => {
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);

  const folders = files.reduce((acc, file) => {
    if (!acc.includes(file.createdBy)) {
      return [...acc, file.createdBy];
    }
    return acc;
  }, [] as string[]);

  const handleSelectFile = (file: IFile) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter((s) => s.id !== file.id));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  return (
    <>
      <div className="flex flex-row items-center justify-end gap-2 px-6 py-4">
        <Button size="small" variant="secondary">
          <ArrowDownTray />
          다운로드
        </Button>
        <Button size="small" variant="secondary">
          <Trash />
          삭제
        </Button>
      </div>
      <div className="flex flex-row divide-x">
        <div className="p-3 w-[275px]">
          <Accordion.Root type="single" defaultValue="item-1" className="flex flex-col gap-3">
            <Accordion.Item
              className="w-full overflow-hidden border divide-y rounded-lg bg-ui-bg-component border-ui-border-base"
              value="item-1"
            >
              <Accordion.Trigger className="flex flex-row items-center gap-2 px-4 py-3">
                <TriangleDownMini />
                <Text size="small">스토리캡쳐</Text>
              </Accordion.Trigger>
              <Accordion.Content className="divide-y">
                {folders.map((folder) => (
                  <div
                    key={folder}
                    className={`flex flex-row items-center gap-2 px-4 py-3 cursor-pointer ${
                      selectedFolder === folder ? 'bg-ui-bg-base-pressed' : 'bg-ui-bg-base'
                    }`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <TriangleRightMini />
                    <Text size="small">{folder}</Text>
                  </div>
                ))}
              </Accordion.Content>
            </Accordion.Item>

            <Accordion.Item
              className="w-full overflow-hidden border divide-y rounded-lg bg-ui-bg-component border-ui-border-base"
              value="item-2"
            >
              <Accordion.Trigger className="flex flex-row items-center gap-2 px-4 py-3">
                <TriangleRightMini />
                <Text size="small">휴지통</Text>
              </Accordion.Trigger>
              <Accordion.Content>TEST</Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </div>
        <div className="flex flex-col w-full gap-3 p-6">
          <Text size="large">파일</Text>
          <div className="grid w-full grid-cols-4 gap-4">
            {files
              .filter((file) => file.createdBy === selectedFolder)
              ?.map((file) => (
                <FileItem
                  key={file.id}
                  item={file}
                  selected={selectedFiles.includes(file)}
                  onClick={() => handleSelectFile(file)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
