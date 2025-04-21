import { INavItem } from '@/medusa/layout/nav-item';
import { House } from '@medusajs/icons';

export interface IRoutes {
  title: string;
  navItems: INavItem[];
}

export const MENU_CONSTANTS: IRoutes[] = [
  {
    title: '메인',
    navItems: [
      {
        icon: <House />,
        label: '메인',
        to: '/',
      },
    ],
  },
];
