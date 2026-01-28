import { LoginForm } from '@/features/auth';
import { verifyGuest } from '@/shared/lib/auth';

export async function LoginPage() {
  await verifyGuest();

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <LoginForm />
    </div>
  );
}
