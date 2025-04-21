import { getOnlyNumber } from '@/utils/utils';
import { Input, Label } from '@medusajs/ui';
import { HTMLInputTypeAttribute } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface IControlledInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder?: string;
  label: string;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  rules?: Parameters<UseFormReturn<T>['register']>[1];
}

export const ControlledInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  type = 'text',
  disabled,
  rules,
}: IControlledInputProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div className="relative flex flex-col w-full space-y-2">
            <div className="flex items-center gap-x-1">
              <Label size="small" weight="plus">
                {`${label} ${rules?.required ? '*' : ''}`}
              </Label>
            </div>
            <Input
              {...field}
              placeholder={placeholder}
              aria-invalid={!!form.formState.errors?.[name]}
              type={type === 'number' ? 'text' : type}
              disabled={disabled}
              onChange={(e) => {
                if (type === 'number') {
                  field.onChange(getOnlyNumber(e.target.value));
                } else {
                  field.onChange(e);
                }
              }}
            />
            {form.formState.errors?.[name] && (
              <div className="absolute text-xs text-red-500 top-full">
                {form.formState.errors?.[name]?.message as string}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
