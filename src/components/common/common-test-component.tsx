import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ICommonTestComponentProps {
  children?: React.ReactNode;
}

const CommonTestComponent = ({ children }: ICommonTestComponentProps) => {
  const commonTestComponentStyle = CommonTestComponentSva();
  return (
    <Box className={commonTestComponentStyle.wrapper}>
      <Box>{children}</Box>
    </Box>
  );
};

export default CommonTestComponent;

const CommonTestComponentSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
