'use client';

import { InfluencerFormDrawer } from '../../components/influencer-form-drawer/influencer-form-drawer';
import { InfluencerListHeader } from '../../components/influencer-list-header';
import { InfluencerListTable } from '../../components/influencer-list-table';
import { SingleColumnPage } from '@/components/layout/pages/single-column-page';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page = ({ params, searchParams }: { params: { id: string }; searchParams: any }) => {
  return (
    <SingleColumnPage>
      <InfluencerListHeader searchParams={searchParams} />
      <InfluencerListTable />
      <InfluencerFormDrawer id={params.id} />
    </SingleColumnPage>
  );
};

export default Page;
