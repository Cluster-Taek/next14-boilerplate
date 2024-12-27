import { PageProps } from '../types';
import { JsonViewSection } from '@/components/common/json-view-section';
import { MetadataSection } from '@/components/common/metadata-section';

export const SingleColumnPage = <TData,>({
  children,
  /**
   * Data of the page which is passed to Widgets, JSON view, and Metadata view.
   */
  data,
  /**
   * Whether to show JSON view of the data. Defaults to false.
   */
  showJSON,
  /**
   * Whether to show metadata view of the data. Defaults to false.
   */
  showMetadata,
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

  return (
    <div className="flex flex-col gap-y-3">
      {children}
      {showMetadata && <MetadataSection data={data!} />}
      {showJSON && <JsonViewSection data={data!} />}
    </div>
  );
};
