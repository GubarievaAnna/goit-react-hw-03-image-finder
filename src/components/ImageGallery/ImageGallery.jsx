import { Component } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../utils/api';
import Button from '../Button/Button.jsx';
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

  componentDidUpdate(prevProps, prevState) {
    const { keyWord } = this.props;
    const { page } = this.state;

    if (prevProps.keyWord !== keyWord) {
      this.setState({ page: 1, status: 'pending', showLoadMore: false });
      api(keyWord)
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState({
            images: hits,
            status: 'resolved',
            showLoadMore: true,
          });

          if (totalHits <= 12) {
            this.setState({ showLoadMore: false });
          }
        })
        .catch(error => this.setState({ status: 'error', error }));

      return;
    }

    if (prevState.page !== page && page !== 1) {
      api(keyWord, page)
        .then(({ hits, totalHits }) => {
          this.setState(prev => ({
            images: [...prev.images, ...hits],
            status: 'resolved',
            loading: false,
            showLoadMore: true,
          }));

          if (Math.ceil(totalHits / 12) === page) {
            this.setState({ showLoadMore: false });
          }
        })
        .catch(error =>
          this.setState({ status: 'error', error, loading: false })
        );

      return;
    }
  }

  changePageQuery = () => {
    this.setState(prev => ({
      page: prev.page + 1,
      loading: true,
      showLoadMore: false,
    }));
  };

  render() {
    const { status, error, showLoadMore, loading } = this.state;
    return (
      <>
        {status === 'rejected' && (
          <div className={s.rejected}>
            Sorry, there are no images matching your search query. Please try
            again.
          </div>
        )}
        {status === 'error' && <div className={s.error}> {error.message} </div>}
        {status === 'pending' && (
          <div className={s.spinner}>
            <ThreeDots
              color="#5d8aa8"
              height={150}
              width={150}
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        {status === 'resolved' && (
          <ul className={s.gallery}>
            {this.state.images.map(el => (
              <ImageGalleryItem
                key={el.id}
                src={el.previewURL}
                alt={el.tags}
                srcModal={el.largeImageURL}
              />
            ))}
          </ul>
        )}
        {loading && (
          <div className={s.spinner}>
            <ThreeDots
              color="#5d8aa8"
              height={150}
              width={150}
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        {showLoadMore && <Button onButtonClick={this.changePageQuery} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default ImageGallery;
