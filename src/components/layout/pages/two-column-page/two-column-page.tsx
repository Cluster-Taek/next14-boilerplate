import { JsonViewSection } from '../../../common/json-view-section';
import { MetadataSection } from '../../../common/metadata-section';
import { PageProps } from '../types';
import { clx } from '@medusajs/ui';
import { Children, ComponentPropsWithoutRef, ComponentType } from 'react';

const Root = <TData,>({
  children,
  /**
   * Widgets to be rendered in the main content area and sidebar.
   */
  data,
  /**
   * Whether to show JSON view of the data. Defaults to false.
   */
  showJSON = false,
  /**
   * Whether to show metadata view of the data. Defaults to false.
   */
  showMetadata = false,
}: PageProps<TData>) => {
  const widgetProps = { data };

  if (showJSON && !data) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('`showJSON` is true but no data is provided. To display JSON, provide data prop.');
    }

    showJSON = false;
  }

  if (showMetadata && !data) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('`showMetadata` is true but no data is provided. To display metadata, provide data prop.');
    }

    showMetadata = false;
  }

  const childrenArray = Children.toArray(children);

  if (childrenArray.length !== 2) {
    throw new Error('TwoColumnPage expects exactly two children');
  }

  const [main, sidebar] = childrenArray;
  const showExtraData = showJSON || showMetadata;

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 xl:grid xl:grid-cols-[minmax(0,_1fr)_440px]">
        <div className="flex w-full min-w-0 flex-col gap-y-3">
          {main}
          {showExtraData && (
            <div className="hidden flex-col gap-y-3 xl:flex">
              {showMetadata && <MetadataSection data={data!} />}
              {showJSON && <JsonViewSection data={data!} />}
            </div>
          )}
        </div>
        <div className="flex w-full flex-col gap-y-3 xl:mt-0">
          {sidebar}
          {showExtraData && (
            <div className="flex flex-col gap-y-3 xl:hidden">
              {showMetadata && <MetadataSection data={data!} />}
              {showJSON && <JsonViewSection data={data!} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Main = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={clx('flex w-full flex-col gap-y-3', className)} {...props}>
      {children}
    </div>
  );
};

const Sidebar = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={clx('flex w-full max-w-[100%] flex-col gap-y-3 xl:mt-0 xl:max-w-[440px]', className)} {...props}>
      {children}
    </div>
  );
};

export const TwoColumnPage = Object.assign(Root, { Main, Sidebar });
