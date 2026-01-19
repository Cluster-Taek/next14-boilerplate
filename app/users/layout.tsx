import { BackButton } from '@/shared/ui/back-button';
import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const layoutStyle = LayoutSva();
  return (
    <Box className={layoutStyle.wrapper}>
      <Box className={layoutStyle.header}>
        <BackButton />
        <Box className={layoutStyle.title}>Users</Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;

const LayoutSva = sva({
  slots: ['wrapper', 'header', 'title', 'back'],
  base: {
    wrapper: {
      display: 'block',
      padding: '4',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '4',
      position: 'relative',
      width: 'full',
    },
    title: {
      fontSize: '2xl',
      fontWeight: 'bold',
    },
    back: {
      fontSize: '2xl',
      marginRight: '4',
      cursor: 'pointer',
      position: 'absolute',
      left: '4',
    },
  },
});
