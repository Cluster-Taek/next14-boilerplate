import { IUserCreateFormValue, useCreateUserMutation } from '@/lib/user';
import { sva } from '@/styled-system/css';
import { Controller, useForm } from 'react-hook-form';

interface IUserCreateFormProps {
  children?: React.ReactNode;
}

const UserCreateForm = ({ children }: IUserCreateFormProps) => {
  const userCreateFormStyle = UserCreateFormSva();

  const {
    handleSubmit: formHandleSubmit,
    formState,
    control,
    reset,
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
        reset();
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
      <button type="submit" className={userCreateFormStyle.button}>
        Submit
      </button>
    </form>
  );
};

export default UserCreateForm;

const UserCreateFormSva = sva({
  slots: ['wrapper', 'input', 'button', 'error'],
  base: {
    wrapper: {
      display: 'block',
    },
    input: {
      width: 'full',
      padding: '2',
      marginTop: '2',
      backgroundColor: 'yellow.200',
    },
    button: {
      padding: '2',
      marginTop: '4',
      backgroundColor: '#111111',
      color: 'white',
      borderRadius: 'md',
    },
    error: {
      color: 'red',
      marginTop: '2',
    },
  },
});
