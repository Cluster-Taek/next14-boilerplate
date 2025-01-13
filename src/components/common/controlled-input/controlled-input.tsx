import { Input, Label } from '@medusajs/ui';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface IControlledInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder?: string;
  label: string;
  name: Path<T>;
  rules?: Parameters<UseFormReturn<T>['register']>[1];
}

export const ControlledInput = <T extends FieldValues>({
  form,
  label,
  name,
  placeholder,
  rules,
}: IControlledInputProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field }) => {
        return (
          <div className="flex flex-col w-full space-y-2">
            <div className="flex items-center gap-x-1">
              <Label size="small" weight="plus">
                {`${label} ${rules?.required ? '*' : ''}`}
              </Label>
            </div>
            <Input {...field} placeholder={placeholder} aria-invalid={!!form.formState.errors?.[name]} />
            {form.formState.errors?.[name] && (
              <div className="text-xs text-red-500">{form.formState.errors?.[name]?.message as string}</div>
            )}
          </div>
        );
      }}
    />
  );
};
