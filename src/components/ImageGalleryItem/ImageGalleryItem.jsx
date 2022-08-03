import PropTypes from 'prop-types';
import s from './Modal.module.css';

const ImageGalleryItem = ({ src, alt }) => {
  return (
    <li className={s.item}>
      <img src={src} alt={alt} classname={s.image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
