'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = () => {
  const router = useRouter();
  return <FaArrowLeft className="text-2xl mr-4 cursor-pointer absolute left-0" onClick={() => router.back()} />;
};

export default BackButton;
