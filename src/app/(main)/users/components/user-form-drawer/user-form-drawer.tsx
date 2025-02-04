'use client';

import { ControlledInput } from '@/components/common/controlled-input';
import { ControlledSelectBox } from '@/components/common/controlled-select-box';
import { IUserFormValue, useCreateUserMutation, useUpdateUserMutation, useUser } from '@/lib/user';
import { Button, Drawer, Label } from '@medusajs/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface IUserFormDrawerProps {
  id?: string;
}

export const UserFormDrawer = ({ id }: IUserFormDrawerProps) => {
  const router = useRouter();
  const form = useForm<IUserFormValue>({
    defaultValues: {
      name: '',
    },
  });

  const { data: user } = useUser(id);
  const { mutate: createUser } = useCreateUserMutation();
  const { mutate: updateUser } = useUpdateUserMutation(id);

  const handleSubmit = form.handleSubmit(async (value) => {
    if (id) {
      updateUser(value, {
        onSuccess: () => {
          router.push(`/users`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      createUser(value, {
        onSuccess: () => {
          form.reset();
          router.push(`/users`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/users`);
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        ...user,
      });
    }
  }, [user, form]);

  return (
    <Drawer open onOpenChange={handleOpenChange}>
      <Drawer.Content>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <Drawer.Header>
              <Drawer.Title>사용자 {id ? '수정' : '생성'}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className="overflow-auto">
              <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-4 px-2 py-4">
                <div className="flex w-full gap-4">
                  <ControlledInput<IUserFormValue>
                    form={form}
                    label="이름"
                    name="name"
                    placeholder="이름을 입력해주세요."
                    rules={{ required: '이름을 필수값입니다' }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <div className="flex flex-col w-full space-y-2">
                    <div className="flex items-center gap-x-1">
                      <Label size="small" weight="plus">
                        지역
                      </Label>
                    </div>
                    <ControlledSelectBox
                      form={form}
                      placeholder="지역을 선택해주세요"
                      rules={{ required: '지역은 필수값입니다' }}
                      name="region"
                      options={[
                        {
                          value: '서울',
                          label: '서울',
                        },
                        {
                          value: '경기',
                          label: '경기',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer className="gap-x-1">
              <Button variant="secondary" size="small">
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="small">
                Save
              </Button>
            </Drawer.Footer>
          </form>
        </FormProvider>
      </Drawer.Content>
    </Drawer>
  );
};
