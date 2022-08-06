import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal.jsx';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  onModalShow = () => {
    this.setState({ showModal: true });
  };

  onModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { src, alt, srcModal } = this.props;
    return (
      <>
        <li className={s.item}>
          <img
            src={src}
            alt={alt}
            className={s.image}
            onClick={this.onModalShow}
          />
        </li>
        {this.state.showModal && (
          <Modal src={srcModal} alt={alt} onModalClose={this.onModalClose} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  srcModal: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
