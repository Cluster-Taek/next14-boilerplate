import { sva } from '@/styled-system/css';
import { Box } from '@/styled-system/jsx';
import { BarLoader } from 'react-spinners';

const Spinner = () => {
  const spinnerStyle = SpinnerSva();
  return (
    <Box className={spinnerStyle.wrapper}>
      <BarLoader color={'#000'} loading={true} />
    </Box>
  );
};

export default Spinner;

const SpinnerSva = sva({
  slots: ['wrapper'],
  base: {
    wrapper: {
      display: 'flex',
      width: 'full',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
