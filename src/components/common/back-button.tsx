'use client';

import { ArrowLongLeft } from '@medusajs/icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return <ArrowLongLeft className="text-2xl mr-4 cursor-pointer absolute left-0" onClick={() => router.back()} />;
};

export default BackButton;
