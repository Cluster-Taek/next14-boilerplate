import Link from 'next/link';
import { LogoutButton } from '@/features/auth';
import { verifySession } from '@/shared/lib/auth';

export async function HomePage() {
  const session = await verifySession();

  return (
    <div className="flex w-full flex-col items-center justify-center h-full p-4">
      <div className="ml-auto text-xl">Hello {session.user.name}!</div>
      <Link className="text-primary-01 hover:text-primary-02" href="/users">
        Go to Users
      </Link>
      <LogoutButton />
    </div>
  );
}
