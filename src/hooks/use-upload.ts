import { usePrompt } from '@medusajs/ui';

interface IDialogOptions {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
}

interface IUploadOptions {
  accept?: string;
  multiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  withConfirm?: boolean;
  dialogOptions?: IDialogOptions;
}

export const useUpload = () => {
  const dialog = usePrompt();

  const onClickUpload = async (options: IUploadOptions) => {
    const { accept, multiple, onChange, withConfirm, dialogOptions } = options;
    if (withConfirm && dialogOptions) {
      const confirmed = await dialog({ ...dialogOptions, variant: 'confirmation' });
      if (!confirmed) return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    if (accept) {
      input.accept = accept;
    }
    if (multiple) {
      input.multiple = multiple;
    }
    input.onchange = (e) => onChange?.(e as unknown as React.ChangeEvent<HTMLInputElement>);
    input.click();
  };

  return {
    onClickUpload,
  };
};
