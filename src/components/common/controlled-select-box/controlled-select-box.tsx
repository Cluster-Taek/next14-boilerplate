import { XMarkMini } from '@medusajs/icons';
import { IconButton, Select } from '@medusajs/ui';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface IControlledSelectBoxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  placeholder?: string;
  name: Path<T>;
  rules?: Parameters<UseFormReturn<T>['register']>[1];
  options: Option[];
}

export const ControlledSelectBox = <T extends FieldValues>({
  form,
  placeholder,
  name,
  rules,
  options,
}: IControlledSelectBoxProps<T>) => {
  return (
    <Controller
      control={form.control}
      name={name}
      rules={rules}
      render={({ field: { ref, onChange, ...field } }) => {
        return (
          <div className="relative flex flex-col w-full gap-2">
            <Select
              aria-invalid={!!form.formState.errors?.[name]}
              {...field}
              onValueChange={onChange}
              key={field.value}
            >
              <Select.Trigger ref={ref}>
                <Select.Value placeholder={placeholder} />
              </Select.Trigger>
              <Select.Content>
                {options.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
            {form.watch(name) && (
              <IconButton
                className="absolute transform -translate-y-1/2 right-6 top-1/2"
                type="button"
                size="small"
                variant="transparent"
                onClick={() => onChange('')}
              >
                <XMarkMini className="text-ui-fg-muted" />
              </IconButton>
            )}
            {form.formState.errors?.[name]?.message && (
              <div className="text-xs text-red-500">
                {JSON.stringify(form.formState.errors?.[name]?.message).replaceAll(`"`, '')}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
