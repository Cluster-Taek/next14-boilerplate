'use client';

import { useCreateUserMutation } from '@/entities/user';
import { type UserCreateFormValues, userCreateFormSchema } from '@/schemas';
import { Button } from '@/shared/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

interface UserCreateFormModalProps {
  onClose: () => void;
}

export const UserCreateFormModal = ({ onClose }: UserCreateFormModalProps) => {
  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
    setError,
  } = useForm<UserCreateFormValues>({
    resolver: zodResolver(userCreateFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const { mutate: createUser } = useCreateUserMutation();

  const handleSubmit = formHandleSubmit(async (data) => {
    createUser(data, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        setError('name', {
          type: 'manual',
          message: error.message,
        });
      },
    });
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-md shadow-md p-4 w-sm mx-auto bg-white">
      <Controller
        control={control}
        name="name"
        render={({ field }) => <input type="text" {...field} className="w-full p-2 mt-2" placeholder="name" />}
      />
      {formState.errors.name && <div className="text-red-500 mt-2">{formState.errors.name.message}</div>}
      <Button type="submit">Submit</Button>
    </form>
  );
};
