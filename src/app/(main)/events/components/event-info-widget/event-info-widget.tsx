'use client';

import { useEvent } from '@/lib/\bevent';
import { Container } from '@medusajs/ui';

interface IEventInfoWidgetProps {
  id?: string;
}
export const EventInfoWidget = ({ id }: IEventInfoWidgetProps) => {
  const { data } = useEvent(id);
  return (
    <Container className="p-0 divide-y">
      <div>{JSON.stringify(data)}</div>
    </Container>
  );
};
