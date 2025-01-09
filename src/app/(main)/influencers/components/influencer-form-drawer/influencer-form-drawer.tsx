import {
  IInfluencerFormValue,
  useCreateInfluencerMutation,
  useInfluencer,
  useUpdateInfluencerMutation,
} from '@/lib/influencer';
import { getOnlyNumber } from '@/utils/utils';
import { Button, DatePicker, Drawer, Input, Label, Select, Textarea } from '@medusajs/ui';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

const categories = ['Beauty', 'Fashion', 'Food', 'Travel', 'Lifestyle'];

interface IInfluencerFormDrawerProps {
  id?: string;
}

export const InfluencerFormDrawer = ({ id }: IInfluencerFormDrawerProps) => {
  const router = useRouter();
  const form = useForm<IInfluencerFormValue>({
    defaultValues: {
      snsId: '',
      category: '',
      birthDate: new Date().toISOString(),
      followers: 0,
    },
  });

  const { data: influencer } = useInfluencer(id);
  const { mutate: createInfluencer } = useCreateInfluencerMutation();
  const { mutate: updateInfluencer } = useUpdateInfluencerMutation(id);

  const handleSubmit = form.handleSubmit(async (value) => {
    if (id) {
      updateInfluencer(value, {
        onSuccess: () => {
          router.push(`/influencers`);
        },
        onError: (error) => {
          console.error(error);
        },
      });
    } else {
      createInfluencer(value, {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          console.error(error);
        },
      });
    }
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(`/influencers`);
    }
  };

  useEffect(() => {
    if (influencer) {
      form.reset({
        ...influencer,
      });
    }
  }, [influencer, form]);

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
                    name="snsId"
                    rules={{ required: 'Sns ID는 필수값입니다' }}
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              아이디 *
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="아이디를 입력해주세요"
                            aria-invalid={!!form.formState.errors.snsId}
                          />
                          {form.formState.errors.snsId && (
                            <div className="text-xs text-red-500">{form.formState.errors.snsId.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="category"
                    rules={{ required: '카테고리는 필수값입니다' }}
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              카테고리
                            </Label>
                          </div>
                          <Select aria-invalid={!!form.formState.errors.category} {...field} onValueChange={onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="카테고리를 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              {categories.map((category) => (
                                <Select.Item key={category} value={category}>
                                  {category}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                          {form.formState.errors.category && (
                            <div className="text-xs text-red-500">{form.formState.errors.category.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="gender"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              성별
                            </Label>
                          </div>
                          <Select {...field} onValueChange={onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="성별를 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              <Select.Item value="M">남</Select.Item>
                              <Select.Item value="F">여</Select.Item>
                            </Select.Content>
                          </Select>
                          {form.formState.errors.gender && (
                            <div className="text-xs text-red-500">{form.formState.errors.gender.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="birthDate"
                    render={({ field: { value, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              생년월일
                            </Label>
                          </div>
                          <DatePicker {...field} value={dayjs(value).toDate()} {...field} />
                          {form.formState.errors.birthDate && (
                            <div className="text-xs text-red-500">{form.formState.errors.birthDate.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="followers"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              팔로워
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="팔로워 숫자를 입력해주세요"
                            onChange={(e) => onChange(getOnlyNumber(e.target.value))}
                          />
                          {form.formState.errors.followers && (
                            <div className="text-xs text-red-500">{form.formState.errors.followers.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="project"
                    render={({ field }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              참여행사
                            </Label>
                          </div>
                          <Textarea {...field} placeholder="ex. 아디다스 삼베 오프닝 파티" />
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
                          <Textarea {...field} placeholder="ex. DM으로만 연락" />
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
