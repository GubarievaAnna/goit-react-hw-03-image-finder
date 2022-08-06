import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  onSubmitForm = e => {
    const { onSubmitSearch } = this.props;
    const { input } = this.state;
    e.preventDefault();
    if (input === '') {
      toast.warn('Please, input your query for search!', {
        autoClose: 2000,
        theme: 'colored',
      });
      return;
    }
    onSubmitSearch(input);
  };

  onInputKey = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.onSubmitForm}>
          <button type="submit" className={s.button}>
            <ImSearch />
          </button>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.input}
            onChange={this.onInputKey}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitSearch: PropTypes.func.isRequired,
};

export default Searchbar;
