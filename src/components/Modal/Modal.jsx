import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ src, alt }) => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Modal;
