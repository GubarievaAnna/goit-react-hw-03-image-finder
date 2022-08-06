import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../Button/Button.jsx';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: '',
    showLoadMore: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.keyWord !== this.props.keyWord) {
      this.setState({ page: 1, status: 'pending' });
      axios
        .get(
          `https://pixabay.com/api/?q=${this.props.keyWord}&page=1&key=28571023-8e49c7f94aea826d37a546ac4&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(response => {
          if (response.data.hits.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState({
            images: response.data.hits,
            status: 'resolved',
            showLoadMore: true,
          });

          if (response.data.totalHits <= 12) {
            this.setState({ showLoadMore: false });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ status: '' });
        });
      return;
    }
  }

  onLoadMoreImages = () => {
    this.setState(prev => ({ page: prev.page + 1, status: 'pending' }));
    axios
      .get(
        `https://pixabay.com/api/?q=${this.props.keyWord}&page=${this.state.page}&key=28571023-8e49c7f94aea826d37a546ac4&image_type=photo&orientation=horizontal&per_page=25`
      )
      .then(response => {
        this.setState(prev => ({
          images: [...prev.images, ...response.data.hits],
          status: 'resolved',
          showLoadMore: true,
        }));

        if (
          response.data.hits.length < 12 ||
          (response.data.hits.length === 12 &&
            this.state.page === response.data.totalHits / 12)
        ) {
          this.setState({ showLoadMore: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ status: '' });
      });
  };

  render() {
    const { status, showLoadMore, showModal } = this.state;

    if (status === 'rejected') {
      return <div> No images found </div>;
    }

    // if (status === 'pending') {
    //   return <ThreeDots color="#00BFFF" height={80} width={80} />;
    // }

    if (status === 'resolved') {
      return (
        <>
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
          {showLoadMore && <Button onButtonClick={this.onButtonClick} />}
        </>
      );
    }
  }
}

ImageGallery.propTypes = {
  keyWord: PropTypes.string.isRequired,
};

export default ImageGallery;
