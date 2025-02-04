import { BarLoader } from 'react-spinners';

export const Spinner = () => {
  return (
    <div className="flex w-full h-dvh justify-center items-center">
      <BarLoader color={'#000'} loading={true} />
    </div>
  );
};
