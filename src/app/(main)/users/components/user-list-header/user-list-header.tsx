'use client';

import { ControlledSelectBox } from '@/components/common/controlled-select-box';
import { useSearchParams } from '@/hooks/use-search-params';
import { IUsersParams } from '@/lib/user';
import { ChevronDown } from '@medusajs/icons';
import { Button, Container, Heading, Input, Text } from '@medusajs/ui';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

export const UserListHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { searchParams, setSearchParams, resetSearchParams } = useSearchParams();
  const [open, setOpen] = useState(true);

  const form = useForm<IUsersParams>({
    defaultValues: {
      name: '',
      ...searchParams,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setSearchParams(data as Record<string, string>, { replace: true });
  });

  const handleReset = () => {
    form.reset({
      name: '',
      region: '',
    });
    resetSearchParams();
    router.replace(pathname);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Container className="w-full p-0 divide-y">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1" className="text-ui-fg-base">
              사용자
            </Heading>
            <div>
              <Button type="button" size="small" variant="transparent" onClick={() => setOpen(!open)}>
                {open ? '닫기' : '열기'}
                <ChevronDown
                  fontSize={15}
                  className={`transition-transform ${open ? 'transform rotate-180' : 'transform rotate-0'}`}
                />
              </Button>
            </div>
          </div>
          {open && (
            <Fragment>
              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center justify-between gap-4 px-6">
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">이름</Text>
                    <Controller
                      control={form.control}
                      name="name"
                      render={({ field: { ...field } }) => {
                        return <Input type="search" {...field} placeholder="이름을 입력해주세요" />;
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">지역</Text>
                    <ControlledSelectBox
                      form={form}
                      placeholder="지역을 선택해주세요"
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
              <div className="flex items-center justify-end gap-3 px-6 py-4">
                <Button type="button" size="small" variant="secondary" onClick={handleReset}>
                  취소
                </Button>
                <Button size="small" variant="primary">
                  필터적용
                </Button>
              </div>
            </Fragment>
          )}
        </Container>
      </form>
    </FormProvider>
  );
};
