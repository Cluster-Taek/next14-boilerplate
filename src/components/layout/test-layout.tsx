import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ITestLayoutProps {
  children?: React.ReactNode;
}

const TestLayout = ({ children }: ITestLayoutProps) => {
  const testLayoutStyle = TestLayoutSva();
  return (
    <Box className={testLayoutStyle.wrapper}>
      <Box>{children}</Box>
    </Box>
  );
};

export default TestLayout;

const TestLayoutSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'block',
    },
  },
});
