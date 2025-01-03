import { PageProps } from '../types';
import { JsonViewSection } from '@/components/common/json-view-section';
import { MetadataSection } from '@/components/common/metadata-section';
import { Children } from 'react';

export const TwoColumnPage = <TData,>({
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

  const [sidebar, main] = childrenArray;
  const showExtraData = showJSON || showMetadata;

  return (
    <div className="flex flex-col w-full gap-y-3">
      <div className="flex w-full flex-col items-start gap-x-4 gap-y-3 xl:grid xl:grid-cols-[400px_minmax(0,_1fr)]">
        <div className="flex flex-col w-full min-w-0 gap-y-3">
          {sidebar}
          {showExtraData && (
            <div className="flex-col hidden gap-y-3 xl:flex">
              {showMetadata && <MetadataSection data={data!} />}
              {showJSON && <JsonViewSection data={data!} />}
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-y-3 xl:mt-0">
          {main}
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
