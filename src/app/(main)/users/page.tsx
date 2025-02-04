import { UserListHeader } from './components/user-list-header';
import { UserListTable } from './components/user-list-table';
import { Spinner } from '@/components/common/spinner';
import { SingleColumnPage } from '@/components/layout/pages/single-column-page';
import { Suspense } from 'react';

const Page = () => {
  return (
    <SingleColumnPage>
      <Suspense fallback={<Spinner />}>
        <UserListHeader />
        <UserListTable />
      </Suspense>
    </SingleColumnPage>
  );
};

export default Page;
