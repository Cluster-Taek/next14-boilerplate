'use client';

import { InfluencerListHeader } from './components/influencer-list-header';
import { InfluencerListTable } from './components/influencer-list-table';
import { SingleColumnPage } from '@/components/layout/pages/single-column-page';

const Page = ({ searchParams }: { searchParams: any }) => {
  return (
    <SingleColumnPage>
      <InfluencerListHeader searchParams={searchParams} />
      <InfluencerListTable />
    </SingleColumnPage>
  );
};

export default Page;
