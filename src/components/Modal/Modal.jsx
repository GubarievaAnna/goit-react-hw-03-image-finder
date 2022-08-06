import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const container = document.getElementById('modal');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onModalClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onModalClose);
  }

  onModalClose = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onModalClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={s.overlay} onClick={this.onModalClose}>
        <div className={s.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      container
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
