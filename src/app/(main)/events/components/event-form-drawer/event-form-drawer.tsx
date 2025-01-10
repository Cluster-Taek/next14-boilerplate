'use client';

import { IEventFormValue, useCreateEventMutation, useEvent, useUpdateEventMutation } from '@/lib/event';
import { getOnlyNumber } from '@/utils/utils';
import { Button, DatePicker, Drawer, Input, Label, Textarea } from '@medusajs/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface IEventFormDrawerProps {
  id?: string;
}

export const EventFormDrawer = ({ id }: IEventFormDrawerProps) => {
  const router = useRouter();
  const form = useForm<IEventFormValue>({
    defaultValues: {
      snsId: '',
      category: '',
      birthDate: new Date().toISOString(),
      followers: 0,
    },
  });

  const { data: event } = useEvent(id);
  const { mutate: createEvent } = useCreateEventMutation();
  const { mutate: updateEvent } = useUpdateEventMutation(id);

  const handleSubmit = form.handleSubmit(async (value) => {
    if (id) {
      updateEvent(value, {
        onSuccess: () => {
          router.push(`/events/${id}`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      createEvent(value, {
        onSuccess: () => {
          form.reset();
          router.push('/events');
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/events/${id}`);
    }
  };

  useEffect(() => {
    if (event) {
      form.reset({
        ...event,
      });
    }
  }, [event, form]);

  return (
    <Drawer open onOpenChange={handleOpenChange}>
      <Drawer.Content>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            <Drawer.Header>
              <Drawer.Title>데이터 수정</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-4 px-2 py-4">
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="title"
                    rules={{ required: '이벤트 명은 필수값입니다' }}
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              이벤트 명 *
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="이벤트 명을 입력해주세요"
                            aria-invalid={!!form.formState.errors.title}
                          />
                          {form.formState.errors.title && (
                            <div className="text-xs text-red-500">{form.formState.errors.title.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              설명
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="설명을 입력해주세요"
                            aria-invalid={!!form.formState.errors.description}
                          />
                          {form.formState.errors.description && (
                            <div className="text-xs text-red-500">{form.formState.errors.description.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <div className="flex flex-col w-full space-y-2">
                    <div className="flex items-center gap-x-1">
                      <Label size="small" weight="plus">
                        이벤트 기간 *
                      </Label>
                    </div>
                    <div className="flex gap-2">
                      <Controller
                        control={form.control}
                        name="startDate"
                        render={({ field: { value, ...field } }) => {
                          return <DatePicker {...field} value={dayjs(value).toDate()} {...field} />;
                        }}
                      />
                      ~
                      <Controller
                        control={form.control}
                        name="endDate"
                        render={({ field: { value, ...field } }) => {
                          return <DatePicker {...field} value={dayjs(value).toDate()} {...field} />;
                        }}
                      />
                    </div>
                    {form.formState.errors.description && (
                      <div className="text-xs text-red-500">{form.formState.errors.description.message}</div>
                    )}
                  </div>
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="recruitment_count"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              모집인원 수
                            </Label>
                          </div>
                          <Input
                            {...field}
                            onChange={(e) => onChange(getOnlyNumber(e.target.value))}
                            placeholder="ex. 80"
                            aria-invalid={!!form.formState.errors.recruitment_count}
                          />
                          {form.formState.errors.recruitment_count && (
                            <div className="text-xs text-red-500">
                              {form.formState.errors.recruitment_count.message}
                            </div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="brand"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              브랜드명
                            </Label>
                          </div>
                          <Input {...field} placeholder="ex. 아디다스" aria-invalid={!!form.formState.errors.brand} />
                          {form.formState.errors.brand && (
                            <div className="text-xs text-red-500">{form.formState.errors.brand.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="createdBy"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              생성자
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="ex. 아디다스"
                            aria-invalid={!!form.formState.errors.createdBy}
                          />
                          {form.formState.errors.createdBy && (
                            <div className="text-xs text-red-500">{form.formState.errors.createdBy.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="memo"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              메모
                            </Label>
                          </div>
                          <Textarea {...field} placeholder="ex. 기타 메모" />
                        </div>
                      );
                    }}
                  />
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
