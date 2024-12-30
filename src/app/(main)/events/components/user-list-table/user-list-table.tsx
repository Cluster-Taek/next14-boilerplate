import { NoResults } from '@/components/common/empty-table-content';
import { useUsers } from '@/lib/user';
import { Container, Heading, Table } from '@medusajs/ui';

const PAGE_SIZE = 10;

export const UserListTable = () => {
  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useUsers({
    _page: 1,
    _per_page: PAGE_SIZE,
  });

  if (isError) {
    throw error;
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>Users</Heading>
      </div>
      {isLoading ? (
        <NoResults />
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={100}>ID</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users?.data?.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};
