import { MOTION } from '@/constants/motion-constants';
import { Loader as LoaderIcon } from '@medusajs/icons';
import { AnimatePresence, motion } from 'framer-motion';

interface ILoaderProps {
  loading?: boolean;
  children?: React.ReactNode;
}

export const Loader = ({ loading, children }: ILoaderProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <>
          <motion.div {...MOTION.FADE} className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-20" />
          <div className="fixed z-50 flex flex-col items-center justify-center gap-1 transform -translate-x-1/2 bottom-5 left-1/2">
            <motion.div {...MOTION.POP} className="flex items-center gap-1 p-2 rounded-lg">
              <div className="bg-ui-bg-subtle text-pretty txt-compact-small grid items-center gap-x-2 rounded-lg border p-3 grid-cols-[20px_1fr]">
                <LoaderIcon className="text-ui-tag-blue-icon animate-spin" />
                <div>{children ?? '잠시만 기다려주세요.'}</div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
