import { EventInfluencersWidget } from './components/event-influencers-widget';
import { EventInfoWidget } from './components/event-info-widget';
import { EventListWidget } from './components/event-list-widget';
import { TwoColumnPage } from '@/components/layout/pages/two-column-page';

const Page = () => {
  return (
    <TwoColumnPage>
      <EventListWidget />
      <div className="flex flex-col space-y-4">
        <EventInfoWidget />
        <EventInfluencersWidget />
      </div>
    </TwoColumnPage>
  );
};

export default Page;
