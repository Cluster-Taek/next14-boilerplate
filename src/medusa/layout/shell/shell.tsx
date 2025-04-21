import { Breadcrumbs } from './breadcrumb';
import { DesktopSidebarContainer } from './desktop-sidebar-container/desktop-sidebar-container';
import { MobileSidebarContainer } from './mobile-sidebar-container/mobile-sidebar-container';
import { ToggleSidebar } from './top-sidebar';
import { PropsWithChildren } from 'react';

export interface IShellProps extends PropsWithChildren {
  sidebar?: React.ReactNode;
}

export const Shell = ({ sidebar, children }: IShellProps) => {
  return (
    <div className="flex flex-col items-start h-screen overflow-hidden lg:flex-row bg-ui-bg-subtle">
      <div>
        <MobileSidebarContainer>{sidebar}</MobileSidebarContainer>
        <DesktopSidebarContainer>{sidebar}</DesktopSidebarContainer>
      </div>
      <div className="flex flex-col w-full h-screen overflow-auto">
        <Topbar />
        <Gutter>{children}</Gutter>
      </div>
    </div>
  );
};

const Gutter = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full max-w-[1600px] flex-col gap-y-2 p-3">{children}</div>;
};

const Topbar = () => {
  return (
    <div className="grid w-full grid-cols-2 p-3 border-b">
      <div className="flex items-center gap-x-1.5">
        <ToggleSidebar />
        <Breadcrumbs />
      </div>
    </div>
  );
};
