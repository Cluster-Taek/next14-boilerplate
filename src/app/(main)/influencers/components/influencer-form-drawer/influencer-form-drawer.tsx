import { ControlledInput } from '@/components/common/controlled-input';
import {
  AGE_GROUP_OPTIONS,
  CATEGORY_OPTIONS,
  PROJECT_OPTIONS,
  REGION_OPTIONS,
  TARGET_OPTIONS,
} from '@/constants/influencer-constants';
import { REGEX } from '@/constants/regex-constants';
import {
  IInfluencerFormValue,
  useCreateInfluencerMutation,
  useInfluencer,
  useUpdateInfluencerMutation,
} from '@/lib/influencer';
import { getHypenNumber, getOnlyNumber } from '@/utils/utils';
import { Button, Drawer, Input, Label, Select } from '@medusajs/ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface IInfluencerFormDrawerProps {
  id?: string;
}

export const InfluencerFormDrawer = ({ id }: IInfluencerFormDrawerProps) => {
  const router = useRouter();
  const form = useForm<IInfluencerFormValue>({
    defaultValues: {
      category: '',
      birthDate: new Date().toISOString(),
      followerCount: 0,
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
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <Drawer.Header>
              <Drawer.Title>데이터 수정</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className="overflow-auto">
              <div className="mx-auto flex w-full max-w-[720px] flex-col gap-y-4 px-2 py-4">
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="region"
                    rules={{ required: '지역은 필수값입니다' }}
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              지역
                            </Label>
                          </div>
                          <Select aria-invalid={!!form.formState.errors.region} {...field} onValueChange={onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="지역을 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              {REGION_OPTIONS.map((region) => (
                                <Select.Item key={region} value={region}>
                                  {region}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                          {form.formState.errors.region && (
                            <div className="text-xs text-red-500">{form.formState.errors.region.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="ageGroup"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              연령대
                            </Label>
                          </div>
                          <Select aria-invalid={!!form.formState.errors.ageGroup} {...field} onValueChange={onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="연령대를 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              {AGE_GROUP_OPTIONS.map((ageGroup) => (
                                <Select.Item key={ageGroup} value={ageGroup}>
                                  {ageGroup}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                          {form.formState.errors.ageGroup && (
                            <div className="text-xs text-red-500">{form.formState.errors.ageGroup.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="projectType"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              프로젝트 유형
                            </Label>
                          </div>
                          <Select
                            aria-invalid={!!form.formState.errors.projectType}
                            {...field}
                            onValueChange={onChange}
                          >
                            <Select.Trigger>
                              <Select.Value placeholder="프로젝트를 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              {PROJECT_OPTIONS.map((project) => (
                                <Select.Item key={project} value={project}>
                                  {project}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                          {form.formState.errors.projectType && (
                            <div className="text-xs text-red-500">{form.formState.errors.projectType.message}</div>
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
                              {CATEGORY_OPTIONS.map((category) => (
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
                    name="target"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              대상 산업/분야
                            </Label>
                          </div>
                          <Select aria-invalid={!!form.formState.errors.target} {...field} onValueChange={onChange}>
                            <Select.Trigger>
                              <Select.Value placeholder="타겟을 선택해주세요" />
                            </Select.Trigger>
                            <Select.Content>
                              {TARGET_OPTIONS.map((target) => (
                                <Select.Item key={target} value={target}>
                                  {target}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                          {form.formState.errors.target && (
                            <div className="text-xs text-red-500">{form.formState.errors.target.message}</div>
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
                              <Select.Item value="F">여성</Select.Item>
                              <Select.Item value="M">남성</Select.Item>
                              <Select.Item value="-">-</Select.Item>
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
                  <ControlledInput<IInfluencerFormValue>
                    form={form}
                    label="직업"
                    name="profession"
                    placeholder="직업을 입력해주세요."
                  />
                </div>
                <div className="flex w-full gap-4">
                  <ControlledInput<IInfluencerFormValue>
                    form={form}
                    label="이름/채널명"
                    name="channelName"
                    placeholder="이름/채널명을 입력해주세요."
                    rules={{ required: '이름/채널명은 필수값입니다' }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <ControlledInput<IInfluencerFormValue>
                    form={form}
                    label="SNS URL"
                    name="snsUrl"
                    rules={{
                      pattern: { value: REGEX.URL, message: 'URL 형식이 아닙니다' },
                    }}
                    placeholder="ex. https://www.instagram.com/aaa"
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="followerCount"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              팔로워 수
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="팔로워 수를 입력해주세요"
                            onChange={(e) => onChange(getOnlyNumber(e.target.value))}
                          />
                          {form.formState.errors.followerCount && (
                            <div className="text-xs text-red-500">{form.formState.errors.followerCount.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <ControlledInput<IInfluencerFormValue>
                    form={form}
                    label="Blog URL"
                    name="blogUrl"
                    rules={{
                      pattern: { value: REGEX.URL, message: 'URL 형식이 아닙니다' },
                    }}
                    placeholder="ex. https://blog.naver.com/aaa"
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="dailyVisitorCount"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              Daily Visitors
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="Daily Visitors를 입력해주세요"
                            onChange={(e) => onChange(getOnlyNumber(e.target.value))}
                          />
                          {form.formState.errors.dailyVisitorCount && (
                            <div className="text-xs text-red-500">
                              {form.formState.errors.dailyVisitorCount.message}
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
                    name="postingCost"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              포스팅 비용
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="포스팅 비용을 입력해주세요"
                            onChange={(e) => onChange(getOnlyNumber(e.target.value))}
                          />
                          {form.formState.errors.postingCost && (
                            <div className="text-xs text-red-500">{form.formState.errors.postingCost.message}</div>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <Controller
                    control={form.control}
                    name="contact"
                    render={({ field: { onChange, ...field } }) => {
                      return (
                        <div className="flex flex-col w-full space-y-2">
                          <div className="flex items-center gap-x-1">
                            <Label size="small" weight="plus">
                              연락처
                            </Label>
                          </div>
                          <Input
                            {...field}
                            placeholder="연락처를 입력해주세요"
                            onChange={(e) => onChange(getHypenNumber(e.target.value))}
                          />
                          {form.formState.errors.contact && (
                            <div className="text-xs text-red-500">{form.formState.errors.contact.message}</div>
                          )}
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
