import Button from '@/components/common/button';
import { MODAL } from '@/constants/modal-key-constants';
import useModals from '@/hooks/use-modals';
import { IUserCreateFormValue, useCreateUserMutation } from '@/lib/user';
import { Controller, useForm } from 'react-hook-form';

const UserCreateFormModal = () => {
  const { closeModal } = useModals();

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
        closeModal(MODAL.USER_CREATE);
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center rounded-md shadow-md p-4 w-64 mx-auto bg-white">
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field }) => <input type="text" {...field} className="w-full p-2 mt-2" placeholder="name" />}
      />
      {formState.errors.name && <div className="text-red-500 mt-2">{formState.errors.name.message}</div>}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default UserCreateFormModal;
