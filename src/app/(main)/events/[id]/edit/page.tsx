import { EventFormDrawer } from '../../components/event-form-drawer';
import { EventInfluencersWidget } from '../../components/event-influencers-widget';
import { EventInfoWidget } from '../../components/event-info-widget';
import { EventListWidget } from '../../components/event-list-widget';
import { TwoColumnPage } from '@/components/layout/pages/two-column-page';

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  return (
    <TwoColumnPage>
      <EventListWidget />
      <div className="flex flex-col space-y-4">
        <EventInfoWidget id={params.id} />
        <EventInfluencersWidget id={params.id} />
        <EventFormDrawer id={params.id} />
      </div>
    </TwoColumnPage>
  );
};

export default Page;
