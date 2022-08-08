import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.spinner}>
      <ThreeDots
        color="#5d8aa8"
        height={150}
        width={150}
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
