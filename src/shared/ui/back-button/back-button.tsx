'use client';

import { sva } from '@/styled-system/css';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export const BackButton = () => {
  const backButtonStyle = BackButtonSva();
  const router = useRouter();
  return <FaArrowLeft className={backButtonStyle.wrapper} onClick={() => router.back()} />;
};

const BackButtonSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      fontSize: '2xl',
      marginRight: '4',
      cursor: 'pointer',
      position: 'absolute',
      left: '0',
    },
  },
});
