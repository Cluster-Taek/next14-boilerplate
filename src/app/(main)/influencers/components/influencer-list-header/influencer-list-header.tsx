'use client';

import { IInfluencersParams } from '@/lib/influencer';
import { ChevronDown } from '@medusajs/icons';
import { Button, Container, Heading, Select, Text } from '@medusajs/ui';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

interface IIInfluencerListHeaderProps {
  searchParams: IInfluencersParams;
}
export const InfluencerListHeader = ({ searchParams }: IIInfluencerListHeaderProps) => {
  const pathname = usePathname();
  const title = useMemo(() => (pathname === '/influencers' ? '인플루언서' : '셀러브리티'), [pathname]);
  const [open, setOpen] = useState(true);
  const form = useForm<IInfluencersParams>({
    defaultValues: searchParams,
  });

  const categories = [
    { label: '전체', value: 'all' },
    { label: '유튜브', value: 'youtube' },
    { label: '인스타그램', value: 'instagram' },
    { label: '블로그', value: 'blog' },
  ];

  return (
    <FormProvider {...form}>
      <form>
        <Container className="w-full p-0 divide-y">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1" className="text-ui-fg-base">
              {title}
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
            <>
              <div className="flex flex-col py-4">
                <div className="flex items-center justify-between gap-4 px-6">
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">카테고리</Text>
                    <Controller
                      control={form.control}
                      name="category"
                      render={({ field: { ref, onChange, ...field } }) => {
                        return (
                          <Select {...field} onValueChange={onChange}>
                            <Select.Trigger ref={ref}>
                              <Select.Value placeholder="Select a currency" />
                            </Select.Trigger>
                            <Select.Content>
                              {categories.map((item) => (
                                <Select.Item key={item.value} value={item.value}>
                                  {item.label}
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select>
                        );
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">성별</Text>
                    <Select>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a currency" />
                      </Select.Trigger>
                      <Select.Content>
                        {categories.map((item) => (
                          <Select.Item key={item.value} value={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">연령대</Text>
                    <Select>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a currency" />
                      </Select.Trigger>
                      <Select.Content>
                        {categories.map((item) => (
                          <Select.Item key={item.value} value={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 px-6 py-4">
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">카테고리</Text>
                    <Select>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a currency" />
                      </Select.Trigger>
                      <Select.Content>
                        {categories.map((item) => (
                          <Select.Item key={item.value} value={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">성별</Text>
                    <Select>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a currency" />
                      </Select.Trigger>
                      <Select.Content>
                        {categories.map((item) => (
                          <Select.Item key={item.value} value={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Text className="text-ui-fg-subtle">연령대</Text>
                    <Select>
                      <Select.Trigger>
                        <Select.Value placeholder="Select a currency" />
                      </Select.Trigger>
                      <Select.Content>
                        {categories.map((item) => (
                          <Select.Item key={item.value} value={item.value}>
                            {item.label}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4">
                <Button size="small" variant="secondary">
                  취소
                </Button>
                <Button size="small" variant="primary">
                  필터적용
                </Button>
              </div>
            </>
          )}
        </Container>
      </form>
    </FormProvider>
  );
};
