'use client';

import { useSuspenseUsers } from '@/entities/user';

export const UsersList = () => {
  const { data: users } = useSuspenseUsers({
    _page: 1,
    _per_page: 10,
  });

  return (
    <div className="w-full flex flex-wrap gap-4">
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
