import { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../utils/api';
import Button from '../Button/Button.jsx';
import Loader from '../Loader/Loader.jsx';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: '',
    error: '',
    showLoadMore: false,
    loading: false,
  };

  fetchPhotos = page => {
    const { keyWord } = this.props;

    this.setState({
      loading: true,
      showLoadMore: false,
    });

    api(keyWord, page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          this.setState({ status: 'rejected' });
          return;
        }

        this.setState(prev => ({
          images: [...prev.images, ...hits],
          status: 'resolved',
        }));

        Math.ceil(totalHits / 12) === page
          ? this.setState({ showLoadMore: false })
          : this.setState({ showLoadMore: true });
      })
      .catch(error => this.setState({ status: 'error', error }))
      .finally(() => this.setState({ loading: false }));
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord } = this.props;
    const { page } = this.state;

    if (prevProps.keyWord !== keyWord) {
      this.setState({ page: 1, images: [], status: '' });
      this.fetchPhotos(1);
      return;
    }

    if (prevState.page !== page && page !== 1) {
      this.fetchPhotos(page);
      return;
    }
  }

  changePageQuery = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, status, error, showLoadMore, loading } = this.state;
    return (
      <>
        {status === 'rejected' && (
          <div className={s.rejected}>
            Sorry, there are no images matching your search query. Please try
            again.
          </div>
        )}
        {status === 'error' && <div className={s.error}> {error.message} </div>}
        {status === 'resolved' && (
          <ul className={s.gallery}>
            {images.map(el => (
              <ImageGalleryItem
                key={el.id}
                src={el.previewURL}
                alt={el.tags}
                srcModal={el.largeImageURL}
              />
            ))}
          </ul>
        )}
        {loading && <Loader />}
        {showLoadMore && <Button onButtonClick={this.changePageQuery} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default ImageGallery;
