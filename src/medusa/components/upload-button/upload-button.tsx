import { Button, Input } from '@medusajs/ui';
import { Fragment, useRef } from 'react';

interface IUploadButtonProps extends Omit<React.ComponentProps<typeof Button>, 'onChange'> {
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = ({ children, onChange, accept, ...props }: IUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Fragment>
      <Input ref={inputRef} type="file" onChange={onChange} className="hidden" accept={accept} />
      <Button
        type="button"
        {...props}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        {children}
      </Button>
    </Fragment>
  );
};
