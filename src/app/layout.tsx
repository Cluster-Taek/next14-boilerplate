import './globals.css';
import CoreProvider from '@/contexts/core-provider';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import type { Metadata } from 'next';

dayjs.locale('ko');

export const metadata: Metadata = {
  title: 'Medusa Store',
  description: 'Medusa Store',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans`}>
        <CoreProvider>{children}</CoreProvider>
      </body>
    </html>
  );
}
