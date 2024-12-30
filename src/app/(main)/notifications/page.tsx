'use client';

import { UserListTable } from './components/user-list-table';
import { SingleColumnPage } from '@/components/layout/pages/single-column-page';

const Page = () => {
  return (
    <SingleColumnPage>
      <UserListTable />
    </SingleColumnPage>
  );
};

export default Page;
