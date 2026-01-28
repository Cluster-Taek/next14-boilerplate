import { verifySession } from '@/shared/lib/auth';
import { UsersPageClient } from './UsersPageClient';

export async function UsersPage() {
  await verifySession();

  return <UsersPageClient />;
}
