'use client';

import { InfluencerListHeader } from '../influencers/components/influencer-list-header';
import { InfluencerListTable } from '../influencers/components/influencer-list-table';
import { SingleColumnPage } from '@/components/layout/pages/single-column-page';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ searchParams }: { searchParams: any }) => {
  return (
    <SingleColumnPage>
      <InfluencerListHeader searchParams={searchParams} />
      <InfluencerListTable />
    </SingleColumnPage>
  );
};

export default Page;
