import { FileItem } from '../file-item';
import { useBulkDeleteEventStoriesMutation } from '@/lib/stories';
import { IFile } from '@/types/common';
import { ArrowDownTray, EllipseMiniSolid, Trash, TriangleDownMini } from '@medusajs/icons';
import { Button, Text, usePrompt } from '@medusajs/ui';
import * as Accordion from '@radix-ui/react-accordion';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Selecto from 'react-selecto';

interface IFileFinderProps {
  files: IFile[];
}

export const FileFinder = ({ files }: IFileFinderProps) => {
  const dialog = usePrompt();
  const selectContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<IFile[]>([]);

  const { mutate: deleteEventStories } = useBulkDeleteEventStoriesMutation();

  const folders = useMemo(
    () =>
      files.reduce((acc, file) => {
        if (!acc.includes(file.createdBy)) {
          return [...acc, file.createdBy];
        }
        return acc;
      }, [] as string[]),
    [files]
  );

  const handleSaveImage = useCallback(async () => {
    selectedFiles.forEach(async (item) => {
      const response = await axios.get(item.url, { responseType: 'blob' });
      saveAs(response.data, item.title);
    });
  }, [selectedFiles]);

  const handleDeleteFiles = useCallback(async () => {
    const confirmedDelete = await dialog({
      title: '스토리 삭제',
      description: '해당 스토리를 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소',
    });
    if (confirmedDelete) {
      deleteEventStories(
        selectedFiles.map((file) => file.id),
        {
          onSuccess: () => {
            setSelectedFiles([]);
          },
        }
      );
    }
  }, [dialog, deleteEventStories, selectedFiles]);

  useEffect(() => {
    if (folders.length > 0) {
      setSelectedFolder(folders[0]);
    }
  }, [folders]);

  return (
    <>
      <div className="flex flex-row items-center justify-end gap-2 px-6 py-4">
        <Button size="small" variant="secondary" onClick={handleSaveImage}>
          <ArrowDownTray />
          다운로드
        </Button>
        <Button size="small" variant="secondary" onClick={handleDeleteFiles}>
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
                    className={`flex flex-row items-center gap-2 px-6 py-3 cursor-pointer ${
                      selectedFolder === folder ? 'bg-ui-bg-base-pressed' : 'bg-ui-bg-base'
                    }`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <EllipseMiniSolid />
                    <Text size="small">{folder}</Text>
                  </div>
                ))}
              </Accordion.Content>
            </Accordion.Item>

            {/* <Accordion.Item
              className="w-full overflow-hidden border divide-y rounded-lg bg-ui-bg-component border-ui-border-base"
              value="item-2"
            >
              <Accordion.Trigger className="flex flex-row items-center gap-2 px-4 py-3">
                <TriangleRightMini />
                <Text size="small">휴지통</Text>
              </Accordion.Trigger>
              <Accordion.Content>TEST</Accordion.Content>
            </Accordion.Item> */}
          </Accordion.Root>
        </div>
        <div ref={selectContainerRef} className="flex flex-col w-full gap-3 p-6 ">
          <Selecto
            // The container to add a selection element
            container={selectContainerRef.current}
            dragContainer={selectContainerRef.current}
            // Targets to select. You can register a queryselector or an Element.
            selectableTargets={['.file-item']}
            // Whether to select by click (default: true)
            selectByClick={true}
            // Whether to select from the target inside (default: true)
            selectFromInside={true}
            // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
            continueSelect={false}
            // Determines which key to continue selecting the next target via keydown and keyup.
            toggleContinueSelect={'shift'}
            // The container for keydown and keyup events
            keyContainer={window}
            // The rate at which the target overlaps the drag area to be selected. (default: 100)
            hitRate={10}
            onSelect={(e) => {
              setSelectedFiles(
                e.selected.map((el) => files.find((file) => file.id === el.getAttribute('data-id'))) as IFile[]
              );
            }}
          />
          <Text size="large">파일</Text>
          <div className="grid w-full grid-cols-4 gap-4">
            {files
              .filter((file) => file.createdBy === selectedFolder)
              ?.map((file) => <FileItem key={file.id} item={file} selected={selectedFiles.includes(file)} />)}
          </div>
        </div>
      </div>
    </>
  );
};
