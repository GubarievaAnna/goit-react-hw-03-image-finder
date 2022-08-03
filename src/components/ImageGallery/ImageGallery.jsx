import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import s from './ImageGallery.module.css';

const ImageGallery = ({ array }) => {
  return (
    <ul class={s.gallery}>
      {array.map(el => (
        <ImageGalleryItem key={el.id} {...el} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  array: PropTypes.array.isRequired,
};

export default ImageGallery;
