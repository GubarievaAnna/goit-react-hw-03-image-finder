import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  state = {
    keyWord: '',
  };

  onSubmitSearch = keyWord => {
    this.setState({ keyWord });
  };

  render() {
    const normalizedKeyWord = this.state.keyWord.toLowerCase().trim();
    return (
      <div className={s.container}>
        <Searchbar onSubmitSearch={this.onSubmitSearch} />
        <ImageGallery keyWord={normalizedKeyWord} />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
