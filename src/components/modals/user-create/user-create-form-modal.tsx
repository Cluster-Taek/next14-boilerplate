'use client';

import Button from '@/components/common/button';
import { type IUserCreateFormValue, useCreateUserMutation } from '@/lib/user';
import { sva } from '@/styled-system/css';
import { Controller, useForm } from 'react-hook-form';

interface UserCreateFormModalProps {
  onClose: () => void;
}

const UserCreateFormModal = ({ onClose }: UserCreateFormModalProps) => {
  const userCreateFormStyle = UserCreateFormModalSva();

  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
    setError,
  } = useForm<IUserCreateFormValue>({
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
    <form onSubmit={handleSubmit} className={userCreateFormStyle.wrapper}>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <input type="text" {...field} className={userCreateFormStyle.input} placeholder="name" />
        )}
      />
      {formState.errors.name && <div className={userCreateFormStyle.error}>{formState.errors.name.message}</div>}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UserCreateFormModal;

const UserCreateFormModalSva = sva({
  slots: ['wrapper', 'input', 'button', 'error'],
  base: {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 'md',
      shadow: 'md',
      padding: '4',
      width: 'sm',
      margin: '0 auto',
      backgroundColor: 'white',
    },
    input: {
      width: 'full',
      padding: '2',
      marginTop: '2',
    },
    button: {
      width: 'full',
      padding: '2',
      marginY: '2',
      borderRadius: 'md',
      backgroundColor: 'primary.01',
      color: 'white',
      '&:hover': {
        backgroundColor: 'primary.02',
      },
    },
    error: {
      color: 'red',
      marginTop: '2',
    },
  },
});
